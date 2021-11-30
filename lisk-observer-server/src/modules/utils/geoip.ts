import { logger } from "@modules/log";
import axios from "axios";

const log = logger("GEOIP");

// ZZ country code is unknown country

export const getGeoIP = async (IP: string) => {
  try {
    const { data: geoIPData } = await axios.get(
      `${process.env.GEOIP_URL}/${IP}?apikey=${process.env.GEOIP_KEY}`
    );

    return {
      ip: geoIPData.ip,
      country: geoIPData.country_code,
    };
  } catch (e) {
    log.error("Failed to fetch Country for IP, defaulting to ZZ");

    return {
      ip: IP,
      country: "ZZ",
    };
  }
};
