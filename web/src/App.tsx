import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Home } from "./home/Home";
import { WelcomePage } from "./account/Welcome";
import { createStore, storeContext } from "./Store";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { TopMessageBar } from "./common/TopMessageBar";

export const App: React.FunctionComponent = () => {
  const store = useLocalStore(createStore);

  return (
    <storeContext.Provider value={store}>
      <div>
        <TopMessageBar />
        <HashRouter>
          <Switch>
            <Route path="/welcome" component={WelcomePage} />
            <Route path="/" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    </storeContext.Provider>
  );
};
