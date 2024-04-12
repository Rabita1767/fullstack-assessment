import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { UserContext } from "./store/user.ts";

const theme = createTheme({});

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_SERVER_URL}/graphql`,
  cache: new InMemoryCache(),
});

// const userContext = useState();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserContext.Provider
        value={JSON.parse(localStorage.getItem("user") as string)}
      >
        <MantineProvider theme={theme}>
          <Notifications position="top-right" limit={5} />
          <App />
        </MantineProvider>
      </UserContext.Provider>
    </ApolloProvider>
  </React.StrictMode>
);
