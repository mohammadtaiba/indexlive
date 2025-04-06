import express from "express";
import TransactionModel from "../models/transactionModel.js";
import {transactions} from "../data/data.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Transactions
 *  description: Transaction management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - buyer
 *         - amount
 *       properties:
 *         buyer:
 *           type: string
 *           description: The buyer's name
 *           example: Christiano Ronaldo
 *         amount:
 *           type: number
 *           format: double
 *           description: The amount of the transaction in USD. Stored in cents, returned as dollars.
 *           example: 9999.99
 *         productIds:
 *           type: array
 *           items:
 *             type: string
 *             description: The list of product IDs related to the transaction
 *             example: ["60c72b2f9b1e8a5b8d7f8f8e"]
 *       timestamps:
 *         type: string
 *         format: date-time
 */


/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions, limited at 50
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: List of all transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transactions not found
 */

router.get("/transactions", async (req, res) => {
    try {
        const transactions = await TransactionModel
            .find()
            .limit(50)

        res.status(200).json(transactions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: The created transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       409:
 *         description: Conflict
 */
router.post("/transactions", async (req, res) => {
    const newTransaction = new TransactionModel(req.body);
    try {
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// DELETE a transaction by ID
/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     responses:
 *       204:
 *         description: The transaction was deleted
 *       404:
 *         description: The transaction was not found
 */

router.delete("/transactions/:id", async (req, res) => {
    const {id} = req.params;
    try {
        await TransactionModel.findByIdAndDelete(id);
        res.status(204).json({message:"Transaction deleted successfully."});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});



// UPDATE a transaction by ID
/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by ID
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: The updated transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: The transaction was not found
 */
router.put("/transactions/:id", async (req, res) => {
    const {id}=req.params;
    const updatedTransaction = req.body;
    try {
        const result = await TransactionModel.findByIdAndUpdate(id, updatedTransaction, {new: true});
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});


export default router;
