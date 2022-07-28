import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../hooks/useAuth";
import { RecoilRoot } from "recoil";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      {/*Higher Order Component*/ }
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
};

export default MyApp;
