import express from "express";
import KpiModel from "../models/kpiModel.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: KPIs
 *   description: Key Performance Indicators management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     KPI:
 *       type: object
 *       properties:
 *         totalProfit:
 *           type: number
 *           format: double
 *           description: The total profit in USD (stored as cents)
 *           example: 1500.00
 *         totalRevenue:
 *           type: number
 *           format: double
 *           description: The total revenue in USD (stored as cents)
 *           example: 10000.00
 *         totalExpenses:
 *           type: number
 *           format: double
 *           description: The total expenses in USD (stored as cents)
 *           example: 8500.00
 *         expensesByCategory:
 *           type: object
 *           additionalProperties:
 *             type: number
 *             format: double
 *             description: The expenses by category in USD (stored as cents)
 *           example:
 *             marketing: 500.00
 *             operations: 8000.00
 *         monthlyData:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               month:
 *                 type: string
 *                 description: The month in string format
 *                 example: "June"
 *               revenue:
 *                 type: number
 *                 format: double
 *                 description: The revenue for the month in USD (stored as cents)
 *                 example: 6000.00
 *               expenses:
 *                 type: number
 *                 format: double
 *                 description: The expenses for the month in USD (stored as cents)
 *                 example: 4500.00
 *         dailyData:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 description: The date in string format
 *                 example: "2023-06-01"
 *               revenue:
 *                 type: number
 *                 format: double
 *                 description: The revenue for the day in USD (stored as cents)
 *                 example: 200.50
 *               expenses:
 *                 type: number
 *                 format: double
 *                 description: The expenses for the day in USD (stored as cents)
 *                 example: 150.75
 *       timestamps:
 *         type: string
 *         format: date-time
 */

/**
 * @swagger
 * /kpis:
 *   get:
 *     summary: Get all KPIs
 *     tags: [KPIs]
 *     responses:
 *       200:
 *         description: List of all KPIs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/KPI'
 *       404:
 *         description: KPIs not found
 */
router.get("/kpis", async (req, res) => {
    try {
        const kpis = await KpiModel.find();
        res.status(200).json(kpis);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;