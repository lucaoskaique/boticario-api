const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    version: "", // by default: '1.0.0'
    title: "", // by default: 'REST API'
    description: "", // by default: ''
  },
  servers: [
    {
      url: "http://localhost:3333", // by default: 'http://localhost:3000'
      description: "", // by default: ''
    },
    // { ... }
  ],
  tags: [
    // by default: empty Array
    {
      name: "", // Tag name
      description: "", // Tag description
    },
    // { ... }
  ],
  components: {}, // by default: empty object
};

const outputFile = "./src/swagger-output.json";
const routes = ["./src/shared/infra/http/routes/index.ts"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
  root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
