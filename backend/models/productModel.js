import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema(
    {
        price: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        expense: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction", // ref: to make a relationship with other schemas
            },
        ],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const ProductModel = mongoose.model("ProductModel", ProductSchema);

export default ProductModel;