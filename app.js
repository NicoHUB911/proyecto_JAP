const express = require("express");
const cors = require('cors');

const jwt = require("jsonwebtoken");
const SECRET_KEY = "eMercado_JAP_266.5";

const app = express();
const port = 3000;

// se usan dos ruteos, product para lo que está disponible desde el principio y user para todo lo que tenga que ver con autenticacion y logins.
const productRouter = require("./routes/productRouter.js");
const userRouter = require("./routes/userRouter.js"); 

app.use(express.json());

app.use("/api/user_cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["token"], SECRET_KEY);
    // console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

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
