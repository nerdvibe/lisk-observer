import React from "react";
import { Container, Nav, NavItem } from "reactstrap";
import { useNodeInfoQuery } from "../../generated/graphql";

export const Footer: React.FC = () => {
  const { data } = useNodeInfoQuery();
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            {process.env.REACT_APP_NETWORK} | {data?.nodeInfo?.name || ""} |{" "}
            {process.env.REACT_APP_VERSION}
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
