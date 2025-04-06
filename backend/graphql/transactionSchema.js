import { gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import transactionModel from "../models/transactionModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const createTransactionTypeDefs = gql`
    type Transaction {
        id: ID!
        buyer: String!
        amount: Float!
        productIds: [ID!]!
    }

    type Query {
        transactions: [Transaction]
    }

    type Mutation {
        createTransaction(buyer: String!, amount: Float!, productIds: [ID!]!): Transaction
        deleteTransaction(id: ID!): Transaction
        updateTransaction(id: ID!, buyer: String, amount: Float, productIds: [ID!]): Transaction
    }
`;

export const createTransactionResolvers = {
    Query: {
        transactions: async () => await transactionModel.find(),
    },
    Mutation: {
        createTransaction: async (_, { buyer, amount, productIds }) => {
            try {
                const newTransaction = new transactionModel({
                    buyer,
                    amount,
                    productIds: productIds.map(id => new ObjectId(id)) // Konvert in ObjectId
                });
                const savedTransaction = await newTransaction.save();
                console.log("Transaction saved successfully:", savedTransaction);
                return savedTransaction;
            } catch (error) {
                console.error("Error saving transaction:", error);
                throw new Error("Failed to create transaction");
            }
        },
        deleteTransaction: async (_, { id }) => {
            try {
                const deletedTransaction = await transactionModel.findByIdAndDelete(id);
                return deletedTransaction;
            } catch (error) {
                console.error("Error deleting transaction:", error);
                throw new Error("Failed to delete transaction");
            }
        },
        updateTransaction: async (_, { id, buyer, amount, productIds }) => {
            try {
                const updatedTransaction = await transactionModel.findByIdAndUpdate(
                    id,
                    {
                        buyer,
                        amount,
                        productIds: productIds ? productIds.map(id => new ObjectId(id)) : undefined
                    },
                    { new: true }
                );
                return updatedTransaction;
            } catch (error) {
                console.error("Error updating transaction:", error);
                throw new Error("Failed to update transaction");
            }
        },
    },
};
