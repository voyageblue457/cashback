import { NostrWebLNProvider } from "@getalby/sdk/webln";

let nwc = null;

export const initNwc = async () => {
  const nwcUrl = process.env.ALBY_NWC_URL;
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
    return nwc;
  } catch (error) {
    console.error("Failed to initialize Alby NWC:", error.message);
    return null;
  }
};

export const getNwc = () => {
  return nwc;
};
