import React, { useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { NetworkInfoQuery } from "../../generated/graphql";
import { useWindowSize } from "../utils/hooks";
import GeoDataMock from "./states.json";

interface Props {
  setTooltipContent: (text: any) => void;
  networkInfo?: NetworkInfoQuery | undefined;
}

const MapChart = ({ setTooltipContent, networkInfo }: Props) => {
  const [geoData, setGeoData] = useState(GeoDataMock);
  const [maxPeers, setMaxPeers] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const countries = networkInfo?.networkInfo?.countries;
  const windowSize = useWindowSize();

  useEffect(() => {
    setIsMobile(windowSize.width < 600);
  }, [windowSize]);

  useEffect(() => {
    mergeGeoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setGeoData, setMaxPeers, geoData, countries]);

  const mergeGeoData = () => {
    let maxPeers = 0;
    const mergeData = geoData;
    mergeData.objects.ne_110m_admin_0_countries.geometries.forEach(
      (country) => {
        countries?.forEach((countryData: any) => {
          if (countryData.country === country.properties.ISO_A2) {
            if (countryData.count && +countryData.count > maxPeers) {
              maxPeers = countryData.count;
            }
            Object.defineProperty(country.properties, "CONNECTED_PEERS", {
              value: countryData.count || 0,
            });
          }
        });
      }
    );
    setGeoData(mergeData);
    setMaxPeers(maxPeers);
  };

  return (
    <ComposableMap
      data-tip=""
      height={250}
      projectionConfig={{ scale: 150, center: [5, 25] }}
    >
      <ZoomableGroup zoom={1} maxZoom={isMobile ? 3 : 1}>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { NAME, CONNECTED_PEERS } = geo.properties;
              const hasPeers = CONNECTED_PEERS > 0;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    if (+CONNECTED_PEERS) {
                      setTooltipContent(
                        <>
                          {NAME} <br />
                          <strong>
                            {(+CONNECTED_PEERS).toLocaleString()} Peers
                          </strong>
                        </>
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#b8b8ff",
                      opacity: hasPeers
                        ? +CONNECTED_PEERS / maxPeers + 0.3
                        : 0.1,
                      outline: "none",
                    },
                    hover: {
                      fill: +hasPeers ? "#6b6bf2" : "#b8b8ff",
                      outline: "none",
                      opacity: hasPeers ? 1 : 0.1,
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
};

export default React.memo(MapChart);
