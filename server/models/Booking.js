const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    carId: { type: String, required: true }, // Reference to Car model
    userId: { type: String, required: true }, // Reference to User model
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ }, // Basic email regex validation
    phoneNumber: { type: String, required: true, match: /^[0-9]{10,15}$/ }, // Validate phone numbers
    fromAddress: { type: String, required: true, trim: true },
    toAddress: { type: String, required: true, trim: true },
    persons: { type: String, required: true}, // Number of persons
    luggage: { type: String, required: true }, // Number of luggage items
    journeyDate: { type: Date, required: true },
    journeyTime: { type: String, required: true }, // Keeping time as string for flexibility
    notes: { type: String, trim: true }, // Optional, no `required` flag
    paymentMethod: { type: String, required: true },
    rentDays: { type: Number, required: true, min: 1 }, // Duration of the rent in days
    bookedDate: { type: Date, default: Date.now }, // Automatically set to current date
    bookedTime: { type: String, default: () => new Date().toLocaleTimeString() }, // Current time
    expiryTime: { type: Date }, // Calculated based on rentDays
});

// Middleware to calculate expiryTime based on rentDays
bookingSchema.pre('save', function (next) {

    if (this.rentDays) {
        this.expiryTime = new Date(this.journeyDate.getTime() + this.rentDays * 24 * 60 * 60 * 1000);
    }
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
