import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../hooks/useAuth";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  // HOC
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
