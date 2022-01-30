import { Request, Response } from "express";
import { ReadWeatherInput } from "../schema/weather.schema";
import {
  addWeather,
  findAndUpdateWeather,
  findWeather,
  getWeather,
} from "../service/weather.service";

export async function getWeatherHandler(
  req: Request<ReadWeatherInput["params"]>,
  res: Response
) {
  //provided address
  const addressParam: string = req.params.addressName;
  //check db whether exists
  let addressExist = await findWeather(addressParam);

  if (addressExist) {
    //if found in cache
    return res.send(JSON.parse(addressExist));
  } else {
    //else call the API
    const foundAddress = await getWeather({ addressParam });
    if (foundAddress) {
      // const { addressName } = foundAddress;
      // upsert the user
      await findAndUpdateWeather(
        {
          addressName: addressParam,
        },
        {
          weather: foundAddress,
        },
        {
          upsert: true,
          new: true,
        }
      );
      //set in cache
      await addWeather(addressParam, foundAddress);
      return res.send(foundAddress);
    } else {
      //If no localtion matches
      return res.status(401).send("Invalid address!");
    }
  }
}
