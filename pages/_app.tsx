import "../styles/globals.css";
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../Styletron.js'
// import { useApollo } from '../lib/apollo'

// import { ApolloProvider } from '@apollo/client'
import { LightTheme, BaseProvider } from 'baseui';

function MyApp({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <StyletronProvider value={styletron}>
      {/* <ApolloProvider client={apolloClient}> */}
      <BaseProvider theme={LightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
      {/* </ApolloProvider > */}
    </StyletronProvider>
  );
}

export default MyApp;
