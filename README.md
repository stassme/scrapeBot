# Vinted Scrape Bot

This project is a web scraper that uses Puppeteer to extract product listings from Vinted and posts new entries to MongoDB Atlas. The bot filters listings based on size (+ some on-website filters), and avoids duplicates by checking with the database.

## Features

- Scrapes product listings from Vinted.
- Filters listings based on size criteria.
- Avoids duplicate entries by checking the database.
- Posts new listings to MongoDB Atlas.

## Dependencies Used

- dotenv
- MongoDB
- mongoose
- nodemon
- puppeteer
