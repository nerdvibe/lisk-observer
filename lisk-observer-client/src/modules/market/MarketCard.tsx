import React, { useEffect } from "react";
import { useState } from "react";

interface MarketCardProp {
  image: string;
  name: string;
  pairs: {
    target: string;
    last: number;
    trade_url: string;
  }[];
}

const MarketCard = ({ image, name, pairs }: MarketCardProp) => {
  const [selectedPair, setSelectedPair] = useState({
    target: "",
    last: 0,
    trade_url: "",
  });
  useEffect(() => {
    setSelectedPair(pairs[0]);
  }, []);

  return (
    <div key={name}>
      <div className="market-card">
        <div className="market-icon">
          <img className="market-card-img" src={image} alt={name} />
        </div>
        <div className="market-card-data">
          <h1 className="market-link mb-2">{name}</h1>
          <div className="w-75 mt-2">
            <div className="market-data-row">
              <p>Price</p>
              <h4>
                <strong>
                  {selectedPair.last < 1
                    ? selectedPair.last
                    : selectedPair.last.toLocaleString()}
                </strong>
              </h4>
            </div>
            <div className="market-data-row">
              <p>Pairs</p>
              <h4 className="w-75 align-right">
                {pairs.map((pair, index) => (
                  <>
                    {pair.target === selectedPair.target ? (
                      <strong>{pair.target}</strong>
                    ) : (
                      <span
                        className="pointer"
                        onClick={() => {
                          setSelectedPair(pair);
                        }}
                      >
                        {pair.target}
                      </span>
                    )}
                    {index !== pairs.length - 1 ? " | " : ""}
                  </>
                ))}
              </h4>
            </div>
          </div>
          <div className="w-75 market-button-container">
            <a
              href={selectedPair.trade_url}
              target="_blank"
              className="market-button"
            >
              <div>Visit</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
