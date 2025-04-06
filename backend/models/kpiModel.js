import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const KPISchema = new Schema(
    {
        totalProfit: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        totalRevenue: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        totalExpenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        expensesByCategory: {
            type: Map,
            of : {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v / 100
            }
        },
        monthlyData: [{
            month: String,
            revenue: {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v / 100
            },
            expenses : {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v / 100
            },
        }], // [] --> for an array
        dailyData: [{
            date: String,
            revenue: {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v / 100
            },
            expenses : {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v / 100
            },
        }],
    },
    {  timestamps: true, toJSON: { getters: true }} // gives us, when is a particular one is created/updated
);

const KpiModel = mongoose.model("KpiModel", KPISchema);

export default KpiModel;
