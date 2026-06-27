import express from "express";
import mongoose from "mongoose";
import ProductModel from "../models/productModel.js";

const router = express.Router();

// GET all products

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Product management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - price
 *         - expense
 *       properties:
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product in USD. Stored in cents, returned as dollars.
 *           example: 29.99
 *         expense:
 *           type: number
 *           format: float
 *           description: The expense of the product in USD. Stored in cents, returned as dollars.
 *           example: 19.99
 *         transactions:
 *           type: array
 *           items:
 *             type: string
 *             description: The list of transaction IDs related to the product
 *             example: ["60c72b2f9b1e8a5b8d7f8f8e"]
 *       timestamps:
 *         type: string
 *         format: date-time
 */

/**
 * @swagger
 * /product/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

router.get("/products", async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new product
/**
 * @swagger
 * /product/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product payload
 */

router.post("/products", async (req, res) => {
    const newProduct = new ProductModel(req.body);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a product by ID
/**
 * @swagger
 * /product/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       204:
 *         description: The product was deleted
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: The product was not found
 */
router.delete("/products/:id", async (req, res) => {
    const {id} = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message: "Invalid product ID"});
    }

    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({message: "Product not found"});
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// UPDATE a product by ID
/**
 * @swagger
 * /product/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID or payload
 *       404:
 *         description: The product was not found
 */
router.put("/products/:id", async (req, res) => {
   const {id}=req.params;
   const updatedProduct = req.body;
   if (!mongoose.isValidObjectId(id)) {
       return res.status(400).json({message: "Invalid product ID"});
   }

   try {
       const result = await ProductModel.findByIdAndUpdate(id, updatedProduct, {new: true});
       if (!result) {
           return res.status(404).json({message: "Product not found"});
       }

       res.status(200).json(result);
   } catch (error) {
       res.status(400).json({message: error.message});
   }
});

export default router;
