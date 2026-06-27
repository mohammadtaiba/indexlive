import assert from "node:assert/strict";
import test from "node:test";
import { print } from "graphql";
import swaggerConfig from "../swaggerConfig.js";
import { createTransactionTypeDefs } from "../graphql/transactionSchema.js";

test("swagger documents the mounted REST paths", () => {
    const paths = swaggerConfig.specs.paths;

    assert.ok(paths["/kpi/kpis"]);
    assert.ok(paths["/product/products"]);
    assert.ok(paths["/product/products/{id}"]);
    assert.ok(paths["/transaction/transactions"]);
    assert.ok(paths["/transaction/transactions/{id}"]);
});

test("transaction GraphQL delete mutation returns a payload", () => {
    const schema = print(createTransactionTypeDefs);

    assert.match(schema, /type DeleteTransactionPayload/);
    assert.match(schema, /deleteTransaction\(id: ID!\): DeleteTransactionPayload!/);
});
