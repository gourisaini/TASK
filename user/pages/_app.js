import "@/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@ant-design/icons";
import AccountProvider, { AccountContext } from '@/context/AccountProvider';

export default function App({ Component, pageProps }) {
  return <AccountProvider>
    <Component {...pageProps} /> 
  </AccountProvider>
}
