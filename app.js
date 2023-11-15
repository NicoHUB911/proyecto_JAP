const express = require("express");

const app = express();
const port = 3000;

const marketRouter = require("./routes/marketRouter.js");

app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", marketRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
