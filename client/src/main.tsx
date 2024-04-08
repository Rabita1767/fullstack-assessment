import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const theme = createTheme({});

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
