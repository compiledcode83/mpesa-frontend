import "../styles/globals.css";
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../Styletron.js'


function MyApp({ Component, pageProps }) {
  return (
    <StyletronProvider value={styletron}>
        <Component {...pageProps} />
      </StyletronProvider>
  );
}

export default MyApp;
