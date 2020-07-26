import React, { Component } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from "react-hot-loader";
import "bootstrap/dist/css/bootstrap.css";
import "../scss/app.scss";
import Router from "./employerNavigation";
import ScrollToTop from "../containers/App/ScrollToTop";
import { config as i18nextConfig } from "../translations";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../containers/App/store";
import { Switch } from "react-router-dom";
i18next.init(i18nextConfig);

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false
    };
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
      // <BrowserRouter>
      <ConnectedRouter history={history}>
        <I18nextProvider i18n={i18next}>
          {/* <ScrollToTop> */}
          <Switch>
            <Router />
          </Switch>
          {/* </ScrollToTop> */}
        </I18nextProvider>
      </ConnectedRouter>
      // </BrowserRouter>
    );
  }
}

export default hot(module)(App);
