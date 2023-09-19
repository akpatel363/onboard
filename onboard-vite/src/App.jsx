import React, { Suspense } from "react";
import { CircularProgress, Container } from "@material-ui/core";

import { Redirect, Route, Switch } from "react-router-dom";
import CommonSnackbar from "./components/CommonSnackbar";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import AuthRoute from "./components/AuthRoute";

const UpdateProfile = React.lazy(() => import("./containers/UpdateProfile"));
const ChangePassword = React.lazy(() => import("./containers/ChangePassword"));
const PublicPage = React.lazy(() => import("./containers/PublicPage"));
const Login = React.lazy(() => import("./containers/Login"));
const Register = React.lazy(() => import("./containers/Register"));
const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const DocumentPage = React.lazy(() => import("./containers/DocumentPage"));

function App() {
  const isAuthenticated = useSelector((store) => store?.common?.token);
  return (
    <>
      {isAuthenticated && <NavBar />}
      <Container style={{ position: "relative" }}>
        <Suspense
          fallback={
            <div className="loader__center">
              <CircularProgress size={30} />
            </div>
          }
        >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/document/:uid" component={PublicPage} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <AuthRoute path="/profile" component={UpdateProfile} />
            <AuthRoute path="/password/change" component={ChangePassword} />
            <AuthRoute path="/page/:id" component={DocumentPage} />
            <Redirect to="/dashboard" />
          </Switch>
        </Suspense>
        <CommonSnackbar />
      </Container>
    </>
  );
}

export default App;
