// routes/attendee.js

const express = require('express');
const router = express.Router();

// I coded the following code with no assistance
// Routes for Attendee Home Page
router.get('/attendee-home', (req, res) => {
    const db = global.db;
    // I coded up till here with no assistance
    const settingsQuery = `SELECT * FROM site_settings WHERE id = 1`;
    const eventsQuery = `
        SELECT * FROM events
        WHERE status = 'published'
        ORDER BY event_date ASC
    `;

    // I coded the following code with no assistance
    db.get(settingsQuery, [], (err, settings) => {
        if (err) throw err;

        db.all(eventsQuery, [], (err2, events) => {
            if (err2) throw err2;

            res.render('attendee-home', {
                settings,
                events
            });
        });
    });
});

//Routes for attendee event page
// GET Attendee Event Page
router.get('/attendee/:id', (req, res) => {
    const eventId = req.params.id;
    const db = global.db;

    const eventQuery = `
        SELECT * FROM events
        WHERE id = ?
    `;

    db.get(eventQuery, [eventId], (err, event) => {
        if (err) throw err;
        if (!event) return res.status(404).send("Event not found");

        res.render('attendee-event', { event });
    });
});
// I coded up till here with no assistance

// POST route to handle ticket booking
router.post('/attendee/:id/book', (req, res) => {
    const { attendee_name, full_price_quantity, concession_quantity } = req.body;
    const eventId = req.params.id;

    if (!attendee_name) return res.send("Name is required");

    const db = global.db;
    const now = new Date().toISOString();

    const insertBooking = `
        INSERT INTO bookings (event_id, attendee_name, full_price_quantity, concession_quantity, booking_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    // I coded the following code with no assistance
    db.run(insertBooking, [eventId, attendee_name, full_price_quantity, concession_quantity, now], function (err) {
        if (err) return res.send("Failed to book tickets.");

        const updateEvent = `
            UPDATE events
            SET 
                full_price_tickets = full_price_tickets - ?,
                concession_tickets = concession_tickets - ?
            WHERE id = ?
        `;

        db.run(updateEvent, [full_price_quantity, concession_quantity, eventId], function (err2) {
            if (err2) return res.send("Failed to update tickets.");

            res.redirect(`/attendee/${eventId}`);
        });
    });
});
// I coded up till here with no assistance

module.exports = router;