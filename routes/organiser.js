// routes/organiser.js

const express = require('express');
const router = express.Router();

// I coded the following code with no assistance
//Routes for Organiser Home Page
/**
 * GET /organiser
 * Renders the Organiser Home Page with:
 *  - Site settings (name and description)
 *  - All published events
 *  - All draft events
 */
router.get('/organiser', (req, res) => {
    const db = global.db;
    // I coded up till here with no assistance

    // Query to fetch site settings
    const settingsQuery = `SELECT * FROM site_settings WHERE id = 1`;

    db.get(settingsQuery, [], (err, settings) => {
        if (err) throw err;

        // Query for published events
        const publishedQuery = `
SELECT 
    id,
    title,
    description,
    event_date,
    created_at,
    published_at,
    full_price_tickets,
    full_price_amount,
    concession_tickets,
    concession_amount
FROM events
WHERE status = 'published'
`;

        // I coded the following code with no assistance
        // Query for draft events
        const draftQuery = `
SELECT 
    id,
    title,
    description,
    event_date,
    created_at,
    published_at,
    full_price_tickets,
    full_price_amount,
    concession_tickets,
    concession_amount
FROM events
WHERE status = 'draft'
`;
        // I coded up till here with no assistance

        // Fetch published events
        db.all(publishedQuery, [], (err, publishedEvents) => {
            if (err) throw err;

            // Fetch draft events after published ones
            db.all(draftQuery, [], (err2, draftEvents) => {
                if (err2) throw err2;

                // Render organiser-home view with data
                res.render('organiser-home', {
                    publishedEvents,
                    draftEvents,
                    settings
                });
            });
        });
    });
});

// ----------------- START of New Draft Event Routes ------------------
/**
 * GET /create-event
 * Creates a new event with draft status and redirects to edit page
 */
router.get('/create-event', (req, res) => {
    const now = new Date().toISOString();
    const db = global.db;

    db.run(`INSERT INTO events (title, description, event_data, created_at, published_at, status) 
            VALUES (?, ?, ?, ?, ?, ?)`,
        ['Untitled Event', '', '', now, '', 'draft'],
        function (err) {
            if (err) throw err;
            // Redirect to edit page for new draft event
            res.redirect(`/edit/${this.lastID}`);
        });
});

// I coded the following code with no assistance
/**
 * POST /publish/:id
 * Changes an event's status from draft to published and adds a published timestamp
 */
router.post('/publish/:id', (req, res) => {
    const now = new Date().toISOString();
    global.db.run("UPDATE events SET status = 'published', published_at = ? WHERE id = ?", [now, req.params.id], function (err) {
        if (err) throw err;
        res.redirect('/organiser');
    });
});
// I coded up till here with no assistance

/**
 * POST /delete/:id
 * Deletes an event (regardless of its status)
 */
router.post('/delete/:id', (req, res) => {
    global.db.run("DELETE FROM events WHERE id = ?", [req.params.id], function (err) {
        if (err) throw err;
        res.redirect('/organiser');
    });
});

// ----------------- END of New Draft Event Routes ------------------

// ----------------- START of Site Settings Routes ------------------

// I coded the following code with no assistance
/**
 * GET /settings
 * Renders the site settings page with current site name and description
 */
router.get('/settings', (req, res) => {
    const query = "SELECT * FROM site_settings WHERE id = 1";
    global.db.get(query, [], (err, row) => {
        if (err) throw err;
        res.render('site-settings', { settings: row });
    });
});
// I coded up till here with no assistance

/**
 * POST /settings
 * Updates the site name and description with new values
 */
router.post('/settings', (req, res) => {
    const { site_name, site_description } = req.body;

    // Simple validation
    if (!site_name || !site_description) {
        return res.send("All fields must be filled.");
    }

    // Update the site settings in database
    const query = `
        UPDATE site_settings
        SET site_name = ?, site_description = ?
        WHERE id = 1
    `;
    global.db.run(query, [site_name.trim(), site_description.trim()], function (err) {
        if (err) throw err;
        res.redirect('/organiser');
    });
});

// ----------------- END of Site Settings Routes --------------------

// ----------------- START of Edit Routes ------------------

// I coded the following code with no assistance
/**
 * GET /edit/:id
 * Loads the edit form for a specific event based on event ID
 */
router.get('/edit/:id', (req, res) => {
    const eventId = req.params.id;
    const query = "SELECT * FROM events WHERE id = ?";

    global.db.get(query, [eventId], (err, event) => {
        if (err) throw err;
        if (!event) {
            return res.status(404).send("Event not found");
        }

        res.render('edit-event', { event });
    });
});
// I coded up till here with no assistance

/**
 * POST /edit/:id
 * Updates an event with the new form values from the edit page
 */
router.post('/edit/:id', (req, res, next) => {
    const { title, description, full_price_tickets, full_price_amount, concession_tickets, concession_amount, event_date } = req.body;
    const updated_at = new Date().toISOString();

    // Validate required fields
    if (!title || !description) {
        return res.status(400).send("Title and description are required.");
    }
    // Parse and validate numbers
    const fullPriceQty = parseInt(full_price_tickets);
    const fullPriceAmt = parseFloat(full_price_amount);
    const concessionQty = parseInt(concession_tickets);
    const concessionAmt = parseFloat(concession_amount);

    if (
        isNaN(fullPriceQty) || fullPriceQty < 0 ||
        isNaN(fullPriceAmt) || fullPriceAmt < 0 ||
        isNaN(concessionQty) || concessionQty < 0 ||
        isNaN(concessionAmt) || concessionAmt < 0
    ) {
        return res.status(400).send("Ticket quantities and prices must be non-negative numbers.");
    }

    // Update query with cleaned values
    const query = `
        UPDATE events 
        SET title = ?, 
            description = ?, 
            full_price_tickets = ?, 
            full_price_amount = ?, 
            concession_tickets = ?, 
            concession_amount = ?, 
            event_date = ?, 
            created_at = ?
        WHERE id = ?
    `;
    const params = [
        title,
        description,
        fullPriceQty,
        fullPriceAmt,
        concessionQty,
        concessionAmt,
        event_date,
        updated_at,
        req.params.id
    ];

    global.db.run(query, params, function (err) {
        if (err) return next(err);
        res.redirect('/organiser');
    });
});

// ----------------- END of Edit Routes --------------------

// ----------------- START of Attendee Event Page Route ------------------

/**
 * GET /attendee/:id
 * Displays details of a specific event to attendees
 */
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

// ----------------- END of Attendee Event Page Route ------------------

// ----------------- START of Booking Page Route ------------------

// I coded the following code with no assistance
/**
 * GET /bookings
 * Displays a table of all bookings with calculated totals
 */
router.get('/bookings', (req, res) => {
    const db = global.db;

    const query = `
    SELECT 
        b.id AS booking_id,
        b.attendee_name,
        b.booking_date,
        b.full_price_quantity,
        b.concession_quantity,
        e.title AS event_title,
        e.event_date,
        e.full_price_amount,
        e.concession_amount,
        (b.full_price_quantity * e.full_price_amount + b.concession_quantity * e.concession_amount) AS total
    FROM bookings b
    JOIN events e ON b.event_id = e.id
    ORDER BY b.id ASC
`;
    // I coded up till here with no assistance

    db.all(query, [], (err, bookings) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to fetch bookings.");
        }
        // Render organiser-bookings.ejs with data
        res.render('organiser-bookings', { bookings });
    });
});

// ----------------- END of Booking Page Route ------------------

module.exports = router;