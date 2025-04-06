import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import swaggerConfig from "./swaggerConfig.js";

import { ApolloServer, gql } from 'apollo-server-express';
import { createTransactionTypeDefs, createTransactionResolvers } from './graphql/transactionSchema.js';

import kpiRoutes from "./routes/kpiRoute.js";
import productRoutes from "./routes/productRoute.js";
import transactionRoutes from "./routes/transactionRoute.js";

import kpiModel from "./models/kpiModel.js";
import productModel from "./models/productModel.js";
import transactionModel from "./models/transactionModel.js";

import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();


const typeDefs = createTransactionTypeDefs;
const resolvers = createTransactionResolvers;



const createServer = async (port) => {
    const app = express();
    app.use(express.json());
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(morgan("common"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    /* ROUTES */
    app.use("/kpi", kpiRoutes);
    app.use("/product", productRoutes);
    app.use("/transaction", transactionRoutes);
    app.use("/api-docs", swaggerConfig.swaggerUi.serve, swaggerConfig.swaggerUi.setup(swaggerConfig.specs));

    mongoose
        .connect(process.env.MONGO_URL)
        .then(async () => {
            app.listen(port, () => console.log(`Server running on port ${port}`));
            console.log(`Gitlab Project ID: ${process.env.PROJECT_ID}`);

            mongoose.connection.once('open', async () => {
                try {
                    console.log(`Dropping database...`);
                    await mongoose.connection.db.dropDatabase();
                    console.log(`Inserting initial data...`);
                    await kpiModel.insertMany(kpis);
                    await productModel.insertMany(products);
                    await transactionModel.insertMany(transactions);
                    console.log(`Data inserted successfully`);
                } catch (error) {
                    if (error.code === 11000) {
                        console.log('Duplicate data detected, skipping insertion');
                    } else {
                        console.log(`Error inserting data: ${error}`);
                    }
                }
            });
        })
        .catch((error) => console.log(`${error} did not connect`));
};

// Start servers on PORT1, PORT2, and PORT3
createServer(process.env.PORT1 || 10081);
createServer(process.env.PORT2 || 10082);
createServer(process.env.PORT3 || 10083);
