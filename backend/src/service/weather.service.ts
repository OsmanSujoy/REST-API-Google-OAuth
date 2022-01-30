import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import WeatherModel, { WeatherDocument } from "../models/weather.model";
import cache from "../utils/cache";
import axios from "axios";
import log from "../utils/logger";

// check weather information in cache
export async function findWeather(addressParam: string) {
  const client = await cache();
  const result = await client.get(`weather.${addressParam}`);
  return result;
}
//set weather infomation in cache
export async function addWeather(addressName: string, address: object) {
  const client = await cache();
  await client.set(`weather.${addressName}`, JSON.stringify(address));
  await client.expire(`weather.'${addressName}'`, 12 * 3600); //12 hours expiration
}

interface WeatherResult {
  addressName: string;
}

export async function getWeather({
  addressParam,
}: {
  addressParam: string;
}): Promise<WeatherResult> {
  // get lat lng from address API
  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${addressParam}&format=json&limit=1`;
  //135+pilkington+avenue,+birmingham&format=xml&polygon_geojson=1&addressdetails=1
  try {
    const res: any = await axios.get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (res.data.length > 0) {
      // Check weather infromation from weather API
      const weatherURL = `http://www.7timer.info/bin/astro.php?lon=${res.data[0].lat}&lat=${res.data[0].lon}&product=astro&output=json`;
      const resWeather: any = await axios.get(weatherURL, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return resWeather.data;
    } else {
      const resData: WeatherResult = {
        addressName: "Invalid address",
      };
      return resData;
    }
  } catch (error: any) {
    log.error(error, "Error fetching address data");
    throw new Error(error.message);
  }
}

// If weather of same is found update else insert
export async function findAndUpdateWeather(
  query: FilterQuery<WeatherDocument>,
  update: UpdateQuery<WeatherDocument>,
  options: QueryOptions = {}
) {
  return WeatherModel.findOneAndUpdate(query, update, options);
}
