
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Template comment given already: Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)


-- This table stores all event-related information.
-- Includes event details like title, description, dates, status, and ticket pricing.

CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date TEXT,
    event_data TEXT,
    created_at TEXT,
    published_at TEXT,
    status TEXT CHECK (status IN ('draft', 'published')) NOT NULL,
        -- I coded the following code with no assistance
    full_price_tickets INTEGER DEFAULT 0,
    full_price_amount REAL DEFAULT 0.0,
    concession_tickets INTEGER DEFAULT 0,
    concession_amount REAL DEFAULT 0.0
);

-- Stores configurable metadata for the website, like name and description.
-- Only a single row is expected and used across the site.
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_name TEXT NOT NULL,
    site_description TEXT
);
-- I coded up till here with no assistance

-- Insert initial site settings row
INSERT INTO site_settings (site_name, site_description)
VALUES ('Tech Talks Live', 'Interactive tech seminars and workshops for developers and innovators.');

    -- I coded the following code with no assistance
-- Stores all attendee bookings for events.
-- Includes quantities of full-price and concession tickets booked by each attendee.
CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    attendee_name TEXT NOT NULL,
    full_price_quantity INTEGER DEFAULT 0,
    concession_quantity INTEGER DEFAULT 0,
    booking_date TEXT,
    -- I coded up till here with no assistance
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- End the transaction and commit changes to the database
COMMIT;

