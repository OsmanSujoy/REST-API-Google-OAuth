import mongoose from "mongoose";
import { UserDocument } from "./user.model";
export interface WeatherDocument extends mongoose.Document {
  user: UserDocument["_id"];
  weather: object;
  addressName: string;
  createdAt: Date;
}

const weatherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  weather: { type: Object, required: true },
  addressName: { type: String, required: true },
  createdAt: { type: Date, expires: 12 * 3600, default: Date.now },
});

const WeatherModel = mongoose.model<WeatherDocument>("Weather", weatherSchema);

export default WeatherModel;
