const express = require("express");
const bcrypt = require("bcrypt");

const Customer = require("../models/Customer");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingCustomer = await Customer.findOne({ email });

        if (existingCustomer) {
            return res.status(400).json({
                message: "Customer already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const customer = new Customer({
            name,
            email,
            password: hashedPassword
        });

        await customer.save();

        res.status(201).json({
            message: "Customer registered successfully",
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(400).json({
                message: "Customer not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            customer.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        res.json({
            message: "Login successful",
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
});
router.put("/update/:id", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        if (name) {
            customer.name = name;
        }

        if (email) {
            customer.email = email;
        }

        if (password) {
            customer.password = await bcrypt.hash(password, 10);
        }

        await customer.save();

        res.json({
            message: "Customer profile updated successfully",
            customer: {
                id: customer._id,
                name: customer.name,
                email: customer.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Profile update failed",
            error: error.message
        });
    }
});
module.exports = router;