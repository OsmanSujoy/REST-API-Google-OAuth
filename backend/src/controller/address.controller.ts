import { Request, Response } from "express";
import { ReadAddressInput } from "../schema/address.schema";
import {
  findAddress,
  addAddress,
  getAddress,
  findAndUpdateAddress,
} from "../service/address.service";
export async function getAddressHandler(
  req: Request<ReadAddressInput["params"]>,
  res: Response
) {
  const addressName: string = req.params.addressName;
  //check in cache
  let addressExist = await findAddress(addressName);

  if (addressExist) {
    //if found in cache
    return res.send(JSON.parse(addressExist));
  } else {
    //else call the API
    const foundAddress = await getAddress({ addressName });
    if (foundAddress) {
      const { address } = foundAddress;
      // upsert the user
      await findAndUpdateAddress(
        {
          addressName: addressName,
        },
        {
          address: address,
        },
        {
          upsert: true,
          new: true,
        }
      );
      //set in cache
      await addAddress(addressName, address);
      return res.send(address);
    } else {
      // if no location matches
      return res.status(401).send("Invalid address!");
    }
  }
}
