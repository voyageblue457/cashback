import { NostrWebLNProvider } from "@getalby/sdk/webln";
import Info from "../models/Info.js";

let nwc = null;

export const initNwc = async () => {
  const nwcUrl = "nostr+walletconnect://d659f5a4a5b5fafefbd0fc34737d8893b34e16e8711d5815ecf3e51641dc08e8?relay=wss://relay.getalby.com&relay=wss://relay2.getalby.com&secret=9d15e95d7e962ec775b48cdbc31c7fa3ea480a683220c6906e69ca4f79bf18bd&lud16=goldenacai479786@getalby.com";
  if (!nwcUrl) {
    console.warn("ALBY_NWC_URL is not set in environment variables. WebLN/NWC provider will not be active.");
    return null;
  }

  try {
    nwc = new NostrWebLNProvider({
      nostrWalletConnectUrl: nwcUrl,
    });

    await nwc.enable();
    console.log("Alby NostrWebLNProvider enabled successfully.");

    // Subscribe to payment notifications
    try {
      await nwc.subscribeNotifications();
      console.log("[Alby NWC] Subscribed to notifications successfully.");

      nwc.on("invoice_paid", async (event) => {
        console.log("Invoice paid!");
        console.log(event);
        try {
          const paymentHash = event.paymentHash || event.payment_hash || event.preimage;
          if (paymentHash) {
            const info = await Info.findOne({ rHash: paymentHash });
            if (info) {
              info.status = true;
              await info.save();
              console.log(`[Alby NWC] Database updated: payment marked as status = true for hash ${paymentHash}`);
            } else {
              console.log(`[Alby NWC] Paid invoice received but no matching Info record found for hash ${paymentHash}`);
            }
          }
        } catch (dbErr) {
          console.error("[Alby NWC] Error updating database on invoice paid event:", dbErr.message);
        }
      });
    } catch (subErr) {
      console.warn("[Alby NWC] Failed to subscribe to notifications:", subErr.message);
    }

    return nwc;
  } catch (error) {
    console.error("Failed to initialize Alby NWC:", error.message);
    return null;
  }
};

export const getNwc = () => {
  return nwc;
};

