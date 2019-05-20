import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./Utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./Actions/authActions";

import { Provider } from "react-redux";
import store from "./ReduxStore/reduxstore";

import PrivateRoute from "./Utils/PrivateRoute";

import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Customer from "./Components/Customer";

// Token ı kontrol et
if (localStorage.jwtToken) {
  // Toker ı göndericeğimiz isteklerin headerına koy
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Kullanıcıyı login yap
  store.dispatch(setCurrentUser(decoded));

  // Token'ın süresi dolmuş mu kontrol et
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Eğer token'ın süresi dolmuşsa kullanıcıyı logout yap
    store.dispatch(logoutUser());

    // Login sayfasına git
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={Login} />

          <Route exact path="/customer" component={Customer} />

          <Switch>
            <PrivateRoute exact path="/admin" component={Admin} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
