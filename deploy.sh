#!/bin/bash
echo "🎆 deploying to prod 🎆"
git add * 
git commit -am "deploy"
git push heroku main
