const express = require("express");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");

const app = express();

app.use(express.json());
app.use("/api/customers", customerRoutes);

app.get("/", (req, res) => {
    res.send("Restaurant Reservation Backend is running");
});

mongoose.connect("mongodb://127.0.0.1:27017/restaurantDB")
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error);
    });