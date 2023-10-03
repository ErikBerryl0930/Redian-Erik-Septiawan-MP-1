const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    title: "Sistem Pemesanan Makanan",
    description:
      "Tugas Mini Project",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "./sweager.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);