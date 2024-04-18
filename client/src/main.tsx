import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const theme = createTheme({});

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

// const userContext = useState();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <MantineProvider theme={theme}>
            <Notifications position="top-right" limit={5} />
            <App />
          </MantineProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
