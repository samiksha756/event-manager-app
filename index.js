/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering

// -------------------- Static Files and Bootstrap Setup --------------------

// Serve Bootstrap static files
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', function (err) {
    if (err) {
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    }
});

// -------------------- Basic Route --------------------

// I coded the following code with no assistance

// Route to render the main landing page (views/home.ejs)
app.get('/', (req, res) => {
    res.render('home');
});

// -------------------- Route Imports --------------------

// Load and use organiser-related routes (home, create/edit/publish events, settings, bookings)
const organiserRoutes = require('./routes/organiser');
app.use('/', organiserRoutes);  // Register the organiser routes at the root level

// Load and use attendee-related routes (attendee home, view events)
const attendeeRoutes = require('./routes/attendee');
app.use('/', attendeeRoutes); // Mount attendee routes at root level

// I coded up till here with no assistance

// Make the web application listen for HTTP requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
