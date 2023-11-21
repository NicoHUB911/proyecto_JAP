const express = require("express");
const cors = require('cors');

const app = express();
const port = 3000;

// se usan dos ruteos, product para lo que está disponible desde el principio y user para todo lo que tenga que ver con autenticacion y logins.
const productRouter = require("./routes/productRouter.js");
const userRouter = require("./routes/userRouter.js"); 

app.use(express.json());

app.use(express.static("public"));
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/", productRouter);
app.use("/users/", userRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});
