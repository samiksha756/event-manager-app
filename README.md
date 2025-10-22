# Event Manager (Express.js + EJS + SQLite)

This web application allows an organiser to manage events (create, publish, edit, delete) and allows attendees to view and book available events. It has been developed using the provided template and meets all base requirements, along with an extension to allow organisers to view all bookings.

---

## Features

- **Organiser workflow**
  - Create, edit, publish/unpublish events
  - Configure **Full-Price** & **Concession** ticket **counts** and **prices**
  - Set **Event Date** and details
  - View **All Bookings** across events (extension)
  - Update **Site Settings** (e.g., site title, banner text)

- **Attendee workflow**
  - Browse **Published** events
  - View event details
  - Make a booking (stores name/contact and ticket choice)

- **Data layer**
  - **SQLite** database with `events`, `bookings`, and `site_settings` tables
  - SQL schema in `db_schema.sql` (versioned in git)

---

## Tech Stack

- **Server:** Node.js, Express.js
- **Views:** EJS templates
- **DB:** SQLite (via `sqlite3`)
- **Styling:** (Bootstrap / CSS in `/public`, depending on your project)
- **Templating structure:** `views/` with partials/layouts


---

## Instructions for using this application

Please follow these **exact steps** to run and assess the application:

### Step 1: Install Node Dependencies ###

Run the following command to install all required libraries:

```bash
npm install
```

> This app uses the following NPM libraries:
>
> - `express@4.18.2` – Routing and server setup
> - `ejs@3.1.8` – HTML templating
> - `sqlite3@5.1.2` – Database integration
> - `bootstrap@5.3.7` – Front-end styling

### Step 2: Build the SQLite Database
Use one of the following commands depending on your operating system:

On Mac/Linux:
npm run build-db

On Windows:
npm run build-db-win

### Step 3: Start the Web server
npm run start

and use:
http://localhost:3000

### Navigation guide 

Once the app is running, test the following pages:

Main Home Page
/ – Links to organiser and attendee pages

Organiser Pages:
/organiser – Home page for organisers
/settings – Site name and description
/create-event – Create a draft event
/edit/:id – Edit event details
/publish/:id – Publish an event
/delete/:id – Delete an event
/bookings – View all attendee bookings (extension implemented)

Attendee Pages
/attendee-home – View published events
/attendee/:id – View details and book tickets for an event


