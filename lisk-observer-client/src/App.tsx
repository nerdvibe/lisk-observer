import * as React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloProvider as ApolloProviderClient } from "@apollo/client";
import { BaseLayout } from "./UI/layouts/BaseLayout";
import "./styles/scss/black-dashboard-react.scss";
import "./styles/css/nucleo-icons.css";
import "./styles/css/custom.css";
import "./fontAwesome";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { apolloClient } from "./apollo";
import ReactTooltip from "react-tooltip";

const hist = createBrowserHistory();

const App: React.FC = () => {
  return (
    <ApolloProviderClient client={apolloClient}>
      <ApolloProvider client={apolloClient as any}>
        <Router history={hist}>
          <Switch>
            <Route path="/" render={(props) => <BaseLayout {...props} />} />
          </Switch>
        </Router>
        <ReactTooltip multiline />
      </ApolloProvider>
    </ApolloProviderClient>
  );
};

export default App;
