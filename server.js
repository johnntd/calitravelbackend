const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Twilio configuration
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Endpoint to send SMS notification
app.post('/send-sms', async (req, res) => {
    const { name, phone, dateTime, serviceType, airport, address } = req.body;

    try {
        await client.messages.create({
            body: `New booking from ${name} (${phone}) for ${serviceType} on ${dateTime}. Airport: ${airport}, Address: ${address}`,
            from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number, e.g., +1XXXYYYZZZZ
            to: '+17142276007' // Your phone number (Duy Hoa)
        });
        res.status(200).json({ message: 'SMS sent successfully' });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
