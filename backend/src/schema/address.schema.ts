import { object, string, TypeOf } from "zod";
const params = {
  params: object({
    addressName: string({
      required_error: "Address is required",
    }),
  }),
};
export const getAddressSchema = object({
  ...params,
});

export type ReadAddressInput = TypeOf<typeof getAddressSchema>;
