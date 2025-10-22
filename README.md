# Event Manager (Express.js + EJS + SQLite)

A coursework-ready **Event Management** web app built with **Express.js**, **EJS** templates, and **SQLite**.  
It supports organiser and attendee flows, event publishing, ticket configuration (full-price & concession), basic site settings, and an **“All Bookings”** extension page.

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

## Project Structure (typical)
```
event-manager/
├─ app.js # Express app entry (sometimes index.js)
├─ package.json
├─ db_schema.sql # SQLite schema for events/bookings/site_settings
├─ routes/
│ ├─ organiser.js # /organiser, /edit/:id, /bookings, /settings, etc.
│ └─ attendee.js # /attendee, /attendee/:id
├─ views/
│ ├─ organiser-home.ejs
│ ├─ organiser-edit.ejs
│ ├─ organiser-bookings.ejs # Extension: list all bookings
│ ├─ attendee-home.ejs
│ ├─ attendee-event.ejs
│ ├─ site-settings.ejs
│ └─ partials/ # header/footer/nav, if used
├─ public/
│ ├─ css/
│ └─ js/
├─ README.md
└─ LICENSE
```


---

## Getting Started

### 1) Prerequisites
- **Node.js** v18+ recommended
- **SQLite3** CLI (for creating the DB from schema)

### 2) Install dependencies
```bash
npm install
```
# macOS/Linux
``` sqlite3 event_manager.sqlite < db_schema.sql ```

# Windows (PowerShell)
``` Get-Content db_schema.sql | sqlite3 event_manager.sqlite ```

## Configuring environment
```
PORT=3000
DB_PATH=./event_manager.sqlite
```

# Run the server
## development (if nodemon is set up)
npm run dev

## or standard start
npm start

Open ``` http://localhost:3000 ```

