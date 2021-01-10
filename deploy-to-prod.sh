#!/bin/bash


echo "🎆 deploying to prod 🎆"
echo ""
echo ""
# npm run lint:fix  
# npm run test
echo ""
echo ""
rm -rf dist/ 
npm run build 
git add * 
git commit -am "deploy"
git push heroku master