import { gql } from '@apollo/client';

export const GET_TRANSACTIONS = gql`
    query GetTransactions {
        transactions {
            id
            buyer
            amount
            productIds
        }
    }
`;

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($buyer: String!, $amount: Float!, $productIds: [String!]!) {
        createTransaction(buyer: $buyer, amount: $amount, productIds: $productIds) {
            id
            buyer
            amount
            productIds
        }
    }
`;

export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($id: ID!) {
        deleteTransaction(id: $id) {
            success
            id
        }
    }
`;

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($id: ID!, $buyer: String, $amount: Float, $productIds: [String!]) {
        updateTransaction(id: $id, buyer: $buyer, amount: $amount, productIds: $productIds) {
            id
            buyer
            amount
            productIds
        }
    }
`;
