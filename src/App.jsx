import React, { Component } from "react";
import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader";
import "bootstrap/dist/css/bootstrap.css";
import "./scss/app.scss";
// import Router from "./navigation/employerNavigation";
import store from "./containers/App/store";
import ScrollToTop from "./containers/App/ScrollToTop";
import { config as i18nextConfig } from "./translations";
import Declaration from "./navigation/employerWrapper";
import Landing from "./LandingPage";
import { BrowserRouter as Router } from "react-router-dom";

i18next.init(i18nextConfig);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  componentWillMount() {
    window.dwolla.configure("sandbox");
  }

  componentDidMount() {
    window.addEventListener("load", () => {
      this.setState({ loading: false });
      setTimeout(() => this.setState({ loaded: true }), 500);
    });
  }

  render() {
    const { loaded, loading } = this.state;
    return (
      <Provider store={store}>
        <Router>
          {/* <Declaration /> */}
          <Landing />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
        </Router>
      </Provider>
    );
  }
}

// export default hot(module)(App);
export default App;
