import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import cache from "../utils/cache";
import AddressModel, { AddressDocument } from "../models/address.model";
import axios from "axios";
import log from "../utils/logger";

// Find address in cache
export async function findAddress(addressName: string) {
  const client = await cache();
  const result = await client.get(`address.${addressName}`);
  return result;
}
//set address in cache
export async function addAddress(addressName: string, address: object) {
  const client = await cache();
  await client.set(`address.${addressName}`, JSON.stringify(address));
  await client.expire(`address.'${addressName}'`, 12 * 3600); //12 hours expiration
}

interface AddressResult {
  addressName: string;
  address: {
    road: string;
    town: string;
    city: string;
    postcode: string;
    country: string;
  };
}

export async function getAddress({
  addressName,
}: {
  addressName: string;
}): Promise<AddressResult> {
  // check user provided address using address API
  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${addressName}&format=json&limit=1`;
  //135+pilkington+avenue,+birmingham&format=xml&polygon_geojson=1&addressdetails=1
  try {
    const res: any = await axios.get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    // console.log(res.data);
    if (res.data.length > 0) {
      // console.log(res.data[0]);
      const resData: AddressResult = {
        addressName: res.data[0].display_name,
        address: {
          road: res.data[0].address.road,
          town: res.data[0].address.town,
          city: res.data[0].address.city,
          postcode: res.data[0].address.postcode,
          country: res.data[0].address.country,
        },
      };
      return resData;
    }
    return res.data[0];
  } catch (error: any) {
    log.error(error, "Error fetching address data");
    throw new Error(error.message);
  }
}
// if address is not found insert else update
export async function findAndUpdateAddress(
  query: FilterQuery<AddressDocument>,
  update: UpdateQuery<AddressDocument>,
  options: QueryOptions = {}
) {
  return AddressModel.findOneAndUpdate(query, update, options);
}
