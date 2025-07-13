import { navigateTo } from "../frontend/src/utils/navigate.utils";

export default function getServerUrl() {
  try {
    const mode = import.meta.env.VITE_MODE;

    if (!mode) throw new Error("❌ VITE_MODE env is missing");

    const server_url = [("dev", "development")].includes(mode)
      ? import.meta.env.VITE_DEV_SERVER_URL ??
        (() => {
          throw new Error("VITE_DEV_SERVER_URL env is not defined");
        })()
      : import.meta.env.VITE_PROD_SERVER_URL ??
        (() => {
          throw new Error("VITE_PROD_SERVER_URL env is not defined");
        })();

    setServerUrl(server_url);
  } catch (err) {
    navigateTo("/error", { state: { status: 500, message: err.message } });
  }
}
