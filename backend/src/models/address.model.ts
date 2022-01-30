import mongoose from "mongoose";
export interface AddressDocument extends mongoose.Document {
  addressName: string;
  address: {
    road: string;
    town: number;
    city: string;
    postcode: string;
    country: string;
  };
  createdAt: Date;
}

const addressSchema = new mongoose.Schema({
  addressName: { type: String, required: true },
  address: {
    road: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
  },
  createdAt: { type: Date, expires: '12h', default: Date.now },
});

const AddressModel = mongoose.model<AddressDocument>("Address", addressSchema);

export default AddressModel;
