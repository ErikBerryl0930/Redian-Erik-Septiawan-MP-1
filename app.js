require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//SWAGGER
 const swaggerUi = require('swagger-ui-express');
 const apiDocumentation = require('./apidocs.json');
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./sweager.json");
// app.use(
//     "/docs-api",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerFile, {
//       explorer: true,
//       swaggerOptions: {
//         docExpansion: "none",
//       },
//     })
//   );
//End Sweager



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

const routes = require('./routes');
app.use(routes);

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
})