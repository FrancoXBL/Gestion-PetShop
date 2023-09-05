const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// ROUTESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
app.use("/public", express.static("./public"));

app.use(morgan("dev"));
app.use(express.json());

const HomeRoute = require("./routes/home");
const ClientRoute = require("./routes/clients");
const ArticulosRoute = require("./routes/articulos");

app.use(HomeRoute);
app.use(ClientRoute);
app.use(ArticulosRoute);

// ROUTESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS

app.set("port", 3000);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.listen(3000);
console.log(`Server on port ${app.get("port")}`);
