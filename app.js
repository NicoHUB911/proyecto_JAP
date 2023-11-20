const express = require("express");
const cors = require('cors');

const app = express();
const port = 3000;

const productRouter = require("./routes/productRouter.js");

app.use(express.json());

app.use(express.static("public"));
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/", productRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
