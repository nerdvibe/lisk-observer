import React from "react";
import { Container, Nav, NavItem } from "reactstrap";
import { useNodeInfoQuery } from "../../generated/graphql";
import { ReactComponent as DiscordLogo } from "../assets/discord-icon.svg";
import { ReactComponent as TwitterLogo } from "../assets/twitter-icon.svg";

export const Footer: React.FC = () => {
  const { data } = useNodeInfoQuery();
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            {process.env.REACT_APP_NETWORK} | {data?.nodeInfo?.name || ""} |{" "}
            {process.env.REACT_APP_VERSION} <br />
            <a
              href="https://lisk.observer/discord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordLogo height={15} width={15} /> Contact us on Discord
            </a>
            {" | "}
            <a
              href="https://twitter.com/carbonaraCrypto"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterLogo height={15} width={15} /> Follow us on Twitter
            </a>
          </NavItem>
        </Nav>
        <div className="copyright text-right">
          © {new Date().getFullYear()} - Observing the Lisk blockchain since
          2019. <br /> Lisk Observer x{" "}
          <a
            href={"https://lisk.westake.club"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Carbonara - We<b>Stake</b>.Club ⚡️
          </a>
        </div>
      </Container>
    </footer>
  );
};
