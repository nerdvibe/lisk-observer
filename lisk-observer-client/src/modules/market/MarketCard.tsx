import React, { useEffect } from "react";
import { useState } from "react";

interface MarketCardProp {
  img: string;
  link: string;
  name: string;
  pairs: { price: number; symbol: string }[];
}

const MarketCard = ({ img, link, name, pairs }: MarketCardProp) => {
  const [selectedPair, setSelectedPair] = useState({
    symbol: "",
    price: 0,
  });
  useEffect(() => {
    setSelectedPair(pairs[0]);
  }, []);

  return (
    <div key={name}>
      <div className="market-card">
        <div className="market-icon">
          <img className="market-card-img" src={img} alt={name} />
        </div>
        <div className="market-card-data">
          <h1 className="market-link mb-2">{name}</h1>
          <div className="w-75 mt-2">
            <div className="market-data-row">
              <p>Price</p>
              <h4>
                <strong>{selectedPair.price}</strong>
              </h4>
            </div>
            <div className="market-data-row">
              <p>Pairs</p>
              <h4 className="w-75 align-right">
                {pairs.map((pair, index) => (
                  <>
                    {pair.symbol === selectedPair.symbol ? (
                      <strong>{pair.symbol}</strong>
                    ) : (
                      <span
                        className="pointer"
                        onClick={() => {
                          setSelectedPair(pair);
                        }}
                      >
                        {pair.symbol}
                      </span>
                    )}
                    {index !== pairs.length - 1 ? " | " : ""}
                  </>
                ))}
              </h4>
            </div>
          </div>
          <div className="w-75 market-button-container">
            <a href={link} target="_blank" className="market-button">
              <div>Visit</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
