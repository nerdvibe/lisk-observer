import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RowCell from "../delegates/RowCell";
import { AvatarSize, DelegateLogo } from "../utils/logos/DelegateLogo";
import {
  CURRENCY_BASE,
  CURRENCY_PAIRS,
} from "../../UI/components/chartBanner/const";
import "./style.css";
import { truncateMidString } from "../utils/strings/strings";
import useBreakpoint from "../utils/hooks/breakpoints";
import { ReactComponent as Siren } from "./assets/siren.svg";

interface Props {
  id: string;
  amount: number;
  value: number;
  sender: string;
  senderName?: string;
  receiver: string;
  receiverName?: string;
  date: string;
  ticker: CURRENCY_PAIRS;
  when?: string;
}

const WhalesRow = ({
  id,
  amount,
  value,
  sender,
  senderName,
  receiver,
  receiverName,
  date,
  ticker,
  when,
}: Props) => {
  const [truncateSize, setTruncateSize] = useState(35);
  const { width } = useBreakpoint();
  const transactionSirens =
    amount >= 10000
      ? amount >= 30000
        ? amount >= 50000
          ? amount >= 100000
            ? 4
            : 3
          : 2
        : 1
      : 0;

  const calculateTruncateSize = () => {
    const windowWidth = width || window.innerWidth;
    if (windowWidth > 1440) {
      setTruncateSize(35);
    } else if (windowWidth > 1300) {
      setTruncateSize(25);
    } else {
      setTruncateSize(15);
    }
  };

  useEffect(() => {
    calculateTruncateSize();
  }, []);

  useEffect(() => {
    calculateTruncateSize();
  }, [width]);

  return (
    <tr className={`account-row `} key={id}>
      <td>
        <div className="ml-3 sirens-column">
          {[...Array(transactionSirens)].map(() => (
            <>
              <Siren width={"20px"} height={"20px"} opacity={0.8} />{" "}
            </>
          ))}
        </div>
      </td>
      <RowCell
        mainItem={`${amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })} Ⱡ`}
        subItem={
          value ? `${value.toLocaleString()} ${CURRENCY_BASE[ticker]}` : ""
        }
        mainItemBold={true}
        // extraClass="w-50"
        subDataTip="Estimated value"
        mainItemClass={"white-text font-l"}
        subItemClass={"white-text"}
      />
      <RowCell
        mainItem={senderName || ""}
        subItem={
          <Link to={`/account/${sender}`}>
            {truncateMidString(sender || "", truncateSize)}
          </Link>
        }
        mainItemBold={true}
        mainItemClass={"white-text font-l"}
        subItemClass={"white-text font-s"}
        extraClass="flex-center h-75px max-w-350"
        image={
          <DelegateLogo
            delegateName={senderName || sender}
            address={sender}
            className="delegate-image"
            generateRandom={true}
            size={AvatarSize.MEDIUM}
          />
        }
      />
      <td className="text-center" style={{ width: "150px" }}>
        <strong>{` → `}</strong>
      </td>
      <RowCell
        mainItem={receiverName || ""}
        mainItemBold={true}
        subItem={
          <Link to={`/account/${receiver}`}>
            {truncateMidString(receiver || "", truncateSize)}
          </Link>
        }
        mainItemClass={"white-text font-l"}
        subItemClass={"white-text font-s"}
        extraClass="flex-center h-75px max-w-350"
        image={
          <DelegateLogo
            delegateName={receiverName || receiver}
            address={receiver}
            className="delegate-image"
            generateRandom={true}
            size={AvatarSize.MEDIUM}
          />
        }
      />
      <RowCell
        mainItem={date}
        mainItemBold={true}
        mainItemClass={"white-text"}
        subItem={<Link to={`/transaction/${id}`}>{when}</Link>}
      />
    </tr>
  );
};

export default WhalesRow;
