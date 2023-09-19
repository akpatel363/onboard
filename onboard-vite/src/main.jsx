import React from "react";
import ReactDOM from "react-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@material-ui/core";

import "./index.css";
import App from "./App";

import configureStore from "./store";
import { pushToSnackBar } from "./store/actions";

const token = localStorage.getItem("token");
const profile = JSON.parse(localStorage.getItem("profile"));

const store = configureStore({ common: { token, profile } });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error) => {
        store.dispatch(
          pushToSnackBar(
            error?.response?.errors?.[0]?.message || "Something went wrong",
            "error"
          )
        );
      },
    },
    mutations: {
      retry: false,
      onError: (err) => {
        store.dispatch(
          pushToSnackBar(
            err?.response?.errors?.[0]?.message || "Something went wrong"
          )
        );
      },
    },
  },
});

const theme = createTheme({
  palette: {
    primary: { main: "#311b92" },
    secondary: { main: "#ffab40" },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
