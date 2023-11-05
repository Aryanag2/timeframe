const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create and connect to the SQLite database
const db = new sqlite3.Database('myapp.db');

// Create the tables for users, calendar, todo, and settings
db.serialize(() => {
  // Create the Users table
  db.run(`CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
  )`);

  // Create the Calendar table
  db.run(`CREATE TABLE IF NOT EXISTS Calendar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    start DATETIME,
    end DATETIME,
    FOREIGN KEY (userId) REFERENCES Users(id)
  )`);

  // Create the Todo table
  db.run(`CREATE TABLE IF NOT EXISTS Todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT,
    deadline DATETIME,
    priority TEXT,
    notes TEXT,
    FOREIGN KEY (userId) REFERENCES Users(id)
  )`);

  // Create the Settings table
  db.run(`CREATE TABLE IF NOT EXISTS Settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    breakTimesStart TIME,
     /* Store as JSON string */
    wakeUpTime TIME,
    longTermGoals TEXT /* Store as JSON string */
    FOREIGN KEY (userId) REFERENCES Users(id)
  )`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
