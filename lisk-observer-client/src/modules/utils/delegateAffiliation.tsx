import React from "react";
import { Badge } from "reactstrap";

interface AffiliationDictionary {
  [key: string]: {
    color: string;
    name: string;
  };
}
const affiliationDictionary: AffiliationDictionary = {
  li: {
    color: "info",
    name: "Lisk Initiative",
  },
  gdt: {
    color: "info",
    name: "GDT",
  },
  binance: {
    color: "danger",
    name: "Binance",
  },
  coincheck: {
    color: "purple",
    name: "Coincheck",
  },
  ghost: {
    color: "danger",
    name: "ghost",
  },
};

export const generateAffiliationLabel = (affiliation: string) => {
  if (affiliation === null) {
    return null;
  }
  const affiliationArray = affiliation.split(",");
  return affiliationArray.map((a, i) => {
    if (affiliationDictionary[a]) {
      return (
        <Badge color={affiliationDictionary[a].color} key={i}>
          {affiliationDictionary[a].name}
        </Badge>
      );
    }
    return null;
  });
};
