@echo off

taskkill /IM cmd.exe

start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && nodemon index.js"

cls