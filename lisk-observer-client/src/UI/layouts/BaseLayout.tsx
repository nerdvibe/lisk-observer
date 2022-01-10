import React, { Suspense, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";
import { Footer } from "../footer/Footer";
import { Sidebar } from "../sidebar/Sidebar";
import { FixedPlugin } from "../fixedPlugin/FixedPlugin";
import { routes } from "../routes";
import logo from "../assets/lisk-logo.png";
import { AccountContainer } from "../../modules/account/accountProfile/AccountContainer";
import { useQuery } from "@apollo/react-hooks";
import { BlockDetailContainer } from "../../modules/block/BlockDetailContainer";
import { BLOCK_HEIGHT_QUERY } from "../../apollo/queries";
import { CURRENCY_PAIRS } from "../components/chartBanner/const";
import { TransactionDetailContainer } from "../../modules/transaction/TransactionDetailContainer";
import { FavoritePlugin } from "../favouritePlugin/FavouritePlugin";
import { useLastTicksQuery } from "../../generated/graphql";
import "./style.css";

const BlockchainOverview = React.lazy(() =>
  import("../../modules/blockchainOverview/BlockchainOverview")
);
const LastVotes = React.lazy(() => import("../../modules/network/LastVotes"));
const LastMessages = React.lazy(() =>
  import("../../modules/messages/LastMessages")
);
const KnownAddresses = React.lazy(() =>
  import("../../modules/knownAddresses/KnownAddresses")
);

export const BlockHeightContext = React.createContext({
  data: {},
  loading: true,
  error: false,
} as any);

export const TickerValueContext = React.createContext({
  value: 0,
  loading: true,
  error: false,
} as any);

export const TickerContext = React.createContext(
  (localStorage.getItem("ticker") as CURRENCY_PAIRS) || CURRENCY_PAIRS.LSKUSD
);
// TODO: enhance type "primary" | "blue" | "green"
export const BaseLayout: React.FC<any> = ({ location }) => {
  const [ticker, setTicker] = useState(CURRENCY_PAIRS.LSKUSD);
  const [backgroundColor] = useState<"primary" | "blue" | "green">("blue");
  const [sidebarOpened, setSidebarOpened] = useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  const blockHeight = useQuery(BLOCK_HEIGHT_QUERY, {
    pollInterval: 5000,
  });

  const tickerValue = useLastTicksQuery({
    pollInterval: 60000,
  });
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setSidebarOpened(sidebarOpened);
  };
  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: string) => {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
          exact={prop.exact}
        />
      );
    });
  };

  const getBrandText = (path: string) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname === routes[i].path) {
        return "Lisk.Observer - " + routes[i].name;
      }
    }
    return "Lisk.Observer";
  };

  return (
    <BlockHeightContext.Provider value={blockHeight}>
      <TickerContext.Provider value={ticker}>
        <TickerValueContext.Provider value={tickerValue}>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              bgColor={backgroundColor}
              logo={{
                innerLink: "/",
                text: `Lisk ${process.env.REACT_APP_NETWORK}`,
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
              location={location}
            />
            <div className="main-panel" data={backgroundColor}>
              <Navbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Suspense fallback={<div className="empty-container" />}>
                <div className="content super-fast-fade-in">
                  <Switch>
                    {getRoutes(routes)}
                    <Route
                      path="/"
                      component={BlockchainOverview}
                      key={"home"}
                      exact={true}
                    />
                    <Route
                      path="/account/:addressContext/:page?"
                      component={AccountContainer}
                      key={"account"}
                    />
                    <Route
                      path="/transaction/:txId"
                      component={TransactionDetailContainer}
                      key={"transaction"}
                    />
                    <Route
                      path="/block/:blockId"
                      component={BlockDetailContainer}
                      key={"block"}
                    />
                    <Route
                      path="/last-messages"
                      component={LastMessages}
                      key={"last-messages"}
                    />
                    <Route
                      path="/known-addresses"
                      component={KnownAddresses}
                      key={"known-addresses"}
                    />
                    <Route path="/votes" component={LastVotes} key={"votes"} />
                  </Switch>
                </div>
              </Suspense>
              <Footer />
            </div>
            <FixedPlugin setTicker={setTicker} />
            <FavoritePlugin />
          </div>
        </TickerValueContext.Provider>
      </TickerContext.Provider>
    </BlockHeightContext.Provider>
  );
};
