// ========================================================================
// File: index.js
// Author: CS100 Team
// Date Created: 03 August 2023
// Copyright: CSTU
// Description: CSTU Passport API
// ========================================================================

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8000;

// Use the cors middleware
app.use(cors());

// Middleware to handle and parse JSON body of incoming requests
app.use(bodyParser.json());

// Start the express server on the specified port
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Root endpoint to serve a welcome page
app.get('/', (req, res) => {
  res.send('<h1 style="text-align: center;">Welcome to CSTU Passport backend!</h1>');
});

// POST endpoint to add a new record to the database
// It validates the provided data and writes it to 'records.json' file
app.post('/record', (req, res) => {
    const data = req.body;

    // Check for mandatory fields in the incoming request
    if (!data.first_name || !data.last_name || !data.student_id || !data.email || !data.title || 
      !data.type_of_work_id || !data.academic_year || !data.semester || !data.start_date || !data.end_date || !data.location || !data.description) {
      return res.status(400).send('All fields are required.');
    }
  
    // Validate that the start and end dates provided fall within the academic calendar
    const dateValidationError = validateDates(data.academic_year, data.semester, data.start_date, data.end_date);
    if (dateValidationError) {
      return res.status(400).json({message: dateValidationError});
    }

    // Structure the record for saving
    const record = {
      first_name: data.first_name,
      last_name: data.last_name,
      student_id: data.student_id,
      email: data.email,
      title: data.title,
      type_of_work_id: data.type_of_work_id,
      academic_year: data.academic_year,
      semester: data.semester,
      start_date: data.start_date,
      end_date: data.end_date,
      location: data.location,
      description: data.description,
    };
  
    let records = [];
    try {
      // Read the existing records from the file
      const jsonData = fs.readFileSync('databases/records.json');
      records = JSON.parse(jsonData);
    } catch (err) {
      // Handle possible errors like file not existing
    }
  
    // Append the new record and save back to the file
    records.push(record);
    fs.writeFileSync('databases/records.json', JSON.stringify(records, null, 2));
    res.status(200).json({message: 'Record added successfully!', data: record});
});

// Function to validate provided start and end dates
// It checks if the dates are within the bounds of the academic calendar
const validateDatesWithCalendar = (academicYear, semester, startDate, endDate) => {
  try {
    const calendars = {
      "2022": [
        {
          "semester": 1,
          "start_date": "2022-08-08T00:00:00",
          "end_date": "2022-11-26T23:59:59"
        },
        {
          "semester": 2,
          "start_date": "2023-01-09T00:00:00",
          "end_date": "2023-05-06T23:59:59"
        },
        {
          "semester": 3,
          "start_date": "2023-06-12T00:00:00",
          "end_date": "2023-07-20T23:59:59"
        }
      ],
      "2023": [
        {
          "semester": 1,
          "start_date": "2023-08-15T00:00:00",
          "end_date": "2023-12-04T23:59:59"
        },
        {
          "semester": 2,
          "start_date": "2024-01-08T00:00:00",
          "end_date": "2024-05-04T23:59:59"
        },
        {
          "semester": 3,
          "start_date": "2024-06-10T00:00:00",
          "end_date": "2024-07-18T23:59:59"
        }
      ]
    };

    const yearData = calendars[academicYear];
    if (!yearData) {
      return 'Academic year not found in calendar.';
    }

    const semesterData = yearData.find(s => s.semester === semester);
    if (!semesterData) {
      return 'Semester not found in calendar.';
    }

    const calendarStartDate = new Date(semesterData.start_date);
    const calendarEndDate = new Date(semesterData.end_date);
    const clientStartDate = new Date(startDate);
    const clientEndDate = new Date(endDate);

    if (clientStartDate < calendarStartDate || clientEndDate > calendarEndDate) {
      return 'Client dates are outside the calendar semester dates.';
    }

    return null;
  } catch (err) {
    console.error('Error parsing calendar data:', err);
    return 'Internal server error';
  }
};

// Example usage:
const validationResult = validateDatesWithCalendar("2023", 1, "2023-09-01T00:00:00", "2023-12-01T23:59:59");
console.log(validationResult);

// GET endpoint to retrieve activity types from 'activityType.json' file
app.get('/getActivityType', (req, res) => {
    fs.readFile('databases/activityType.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading activityType.json:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      try {
        const activityTypes = JSON.parse(data);
        return res.status(200).json(activityTypes);
      } catch (err) {
        console.error('Error parsing activityType.json:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
    });
});

// GET endpoint to retrieve list of passport form from 'records.json' file
app.get('/getPassports', (req, res) => {
  fs.readFile('databases/records.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading records.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    try {
      const passports = JSON.parse(data);
      return res.status(200).json(passports);
    } catch (err) {
      console.error('Error parsing records.json:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});