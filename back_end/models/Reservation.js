const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },

    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    numberOfGuests: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;