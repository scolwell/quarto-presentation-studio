#!/bin/bash
# Hostinger Node.js startup script

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  npm install
fi

# Start the server
npm start
