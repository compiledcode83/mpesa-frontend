import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../Styletron.js'
import { LightTheme, BaseProvider } from 'baseui';
// import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}

export default MyApp;
