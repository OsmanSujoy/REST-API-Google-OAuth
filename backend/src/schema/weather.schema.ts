import { object, string, TypeOf } from "zod";
const params = {
  params: object({
    addressName: string({
      required_error: "Address is required",
    }),
  }),
};
export const getWeatherSchema = object({
  ...params,
});

export type ReadWeatherInput = TypeOf<typeof getWeatherSchema>;