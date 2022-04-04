import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {
  Button as ButtonReactStrap,
  Collapse as CollapseReactStrap,
  DropdownToggle as DropdownToggleReactStrap,
  DropdownMenu as DropdownMenuReactStrap,
  DropdownItem as DropdownItemReactStrap,
  UncontrolledDropdown as UncontrolledDropdownReactStrap,
  InputGroup as InputGroupReactStrap,
  Navbar as NavbarReactStrap,
  NavLink as NavLinkReactStrap,
  Nav as NavReactStrap,
  Container as ContainerReactStrap,
  Badge,
} from "reactstrap";
import logo from "../assets/lisk-logo.png";
import { SearchModal } from "./SearchModal";
import {
  BlockHeightContext,
  TickerContext,
  TickerValueContext,
} from "../layouts/BaseLayout";
import { useLastTicksQuery } from "../../generated/graphql";
import { CURRENCY_PAIRS, CURRENCY_BASE } from "../components/chartBanner/const";
import "./style.css";
import ObserverLogo from "./lisk-observer.svg";
import TelescopeAnimation from "../assets/telescope.svg";
import { Link } from "react-router-dom";
import { ReactComponent as DiscordIcon } from "../assets/discord-icon.svg";
import CustomNodeModal from "./CustomNodeModal";

export const Navbar: React.FC<any> = ({ toggleSidebar, sidebarOpened }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [customNodeModal, setCustomNodeModal] = useState(false);
  const [color, setColor] = useState("");
  const {
    data: pricesData,
    loading: pricesLoading,
    error: pricesError,
  }: any = React.useContext(TickerValueContext);
  const { data, loading, error }: any = React.useContext(BlockHeightContext);
  const ticker = React.useContext(TickerContext);
  const [currency, setCurrency] = useState<CURRENCY_PAIRS>(
    (ticker as CURRENCY_PAIRS) || CURRENCY_PAIRS.LSKUSD
  );
  useEffect(() => {
    if (ticker) {
      setCurrency(ticker);
    }
  }, [ticker]);

  const prices = pricesData?.lastTicks;

  const blockchainStatusColor =
    !!loading || !!error
      ? !!loading
        ? "unknown-status"
        : "red-status"
      : "green-status";
  const blockHeight = data?.lastBlock?.height ? data.lastBlock.height : 0;

  useEffect(() => {
    window.addEventListener("resize", updateColor);

    return () => {
      window.removeEventListener("resize", updateColor);
    };
  });

  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("");
    }
  };

  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor("");
    } else {
      setColor("bg-white");
    }
    setCollapseOpen(!collapseOpen);
  };

  // this function is to open the SearchCard modal
  const toggleModalSearch = () => {
    setModalSearch(!modalSearch);
  };

  return (
    <>
      <NavbarReactStrap
        className={classNames("navbar-absolute", color, "sticky-navbar")}
        expand="lg"
      >
        <ContainerReactStrap fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: sidebarOpened,
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <Link to="/">
              <div>
                <object
                  className="note-icon navbar-logo float-left inline-element"
                  data={TelescopeAnimation}
                  type="image/svg+xml"
                  aria-label="lisk.observer logo"
                />
                <img
                  src={ObserverLogo}
                  alt="Lisk.observer"
                  className="navbar-logo-text inline-element"
                />
              </div>
            </Link>
          </div>
          <button
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navigation"
            data-toggle="collapse"
            id="navigation"
            type="button"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <CollapseReactStrap navbar isOpen={collapseOpen}>
            <NavReactStrap className="ml-auto" navbar>
              <InputGroupReactStrap>
                <div className="mt-3">
                  <Badge className={"badge-dark font-s navbar-lisk-price"}>
                    {pricesLoading || pricesError ? (
                      pricesLoading ? (
                        "Loading ticker"
                      ) : (
                        "Ticker error"
                      )
                    ) : (
                      <>
                        💎 1 LSK :{" "}
                        <span>{(prices && prices[currency]) || -1}</span>{" "}
                        {CURRENCY_BASE[currency]}
                      </>
                    )}
                  </Badge>
                </div>
              </InputGroupReactStrap>

              <InputGroupReactStrap className="search-bar">
                <div className="mt-3">
                  <Badge
                    className={
                      "badge-dark text-capitalize font-s navbar-lisk-price"
                    }
                  >
                    <div
                      className={`float-left mr-2 dot-status ${blockchainStatusColor}`}
                    />
                    {process.env.REACT_APP_NETWORK} Block-height:{" "}
                    {!!blockHeight ? (+blockHeight).toLocaleString() : "..."}
                  </Badge>
                </div>
              </InputGroupReactStrap>
              <InputGroupReactStrap className="search-bar">
                <div className="mt-3">
                  <Badge className={"badge-dark font-s navbar-lisk-price"}>
                    <>
                      <DiscordIcon width={12} height={12} />
                      <a
                        href="https://lisk.observer/discord"
                        className="text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        Chat with us
                      </a>
                    </>
                  </Badge>
                </div>
              </InputGroupReactStrap>
              <InputGroupReactStrap className="search-bar">
                <ButtonReactStrap
                  color="link"
                  data-target="#searchModal"
                  data-toggle="modal"
                  id="search-button"
                  onClick={toggleModalSearch}
                >
                  <i className="app-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </ButtonReactStrap>
              </InputGroupReactStrap>
              <UncontrolledDropdownReactStrap nav>
                <DropdownToggleReactStrap
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={logo} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                </DropdownToggleReactStrap>
                <DropdownMenuReactStrap
                  className="dropdown-navbar dark-dropdown"
                  right
                  tag="ul"
                >
                  <NavLinkReactStrap tag="li">
                    <DropdownItemReactStrap className="nav-item" tag="li">
                      <a
                        href="https://lisk.observer"
                        className="network-select-link force-white-text pointer"
                      >
                        Mainnet
                      </a>
                    </DropdownItemReactStrap>
                    <DropdownItemReactStrap className="nav-item" tag="li">
                      <a
                        href="https://testnet.lisk.observer"
                        className="network-select-link force-white-text pointer"
                      >
                        Testnet
                      </a>
                    </DropdownItemReactStrap>
                    <DropdownItemReactStrap className="nav-item" tag="li">
                      <a
                        href="https://legacy-mainnet.lisk.observer"
                        className="network-select-link force-white-text pointer"
                      >
                        Legacy Mainnet
                      </a>
                    </DropdownItemReactStrap>
                    <DropdownItemReactStrap
                      className="nav-item"
                      tag="li"
                      onClick={() => setCustomNodeModal(true)}
                    >
                      <p className="force-white-text pointer">Custom node</p>
                    </DropdownItemReactStrap>
                  </NavLinkReactStrap>
                </DropdownMenuReactStrap>
              </UncontrolledDropdownReactStrap>
              <li className="separator d-lg-none" />
            </NavReactStrap>
          </CollapseReactStrap>
        </ContainerReactStrap>
      </NavbarReactStrap>
      <CustomNodeModal
        show={customNodeModal}
        closeModal={() => setCustomNodeModal(false)}
      />
      <SearchModal
        modalSearch={modalSearch}
        toggleModalSearch={toggleModalSearch}
      />
    </>
  );
};
