# github-api

Express + Node JS API that returns specific github information (to be consumed by a frontend project)

Built with Express, Node, Babel & Jest. You can read about these technologies here: 

- [Express](http://expressjs.com/)
- [Node](https://nodejs.org/en/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)

## deployment notes 


### build for production

In order to deploy, the ES6 JS needs to be transpiled with the help of babel to common js. This is achieved by running the below NPM command. For each deployment you will need to remove the dist/ folder, run the build script & then deploy to production

```shell
npm run build
```
