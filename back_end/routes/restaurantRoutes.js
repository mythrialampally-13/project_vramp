const express = require("express");
const bcrypt = require("bcrypt");

const Restaurant = require("../models/Restaurant");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, address } = req.body;

        const existingRestaurant = await Restaurant.findOne({ email });

        if (existingRestaurant) {
            return res.status(400).json({
                message: "Restaurant already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const restaurant = new Restaurant({
            name,
            email,
            password: hashedPassword,
            address
        });

        await restaurant.save();

        res.status(201).json({
            message: "Restaurant registered successfully",
            restaurant: {
                id: restaurant._id,
                name: restaurant.name,
                email: restaurant.email,
                address: restaurant.address
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Restaurant registration failed",
            error: error.message
        });
    }
});

module.exports = router;