const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

if (!isProduction) mongoose.set("debug", true);

app.use(require("./routes"));

connect();

function listen() {
    app.listen(port);
    console.log(`Express app started on port ${port}`);
}

function connect() {
    mongoose.connection
        .on("error", console.log)
        .on("disconnected", connect)
        .once("open", listen);
    return mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));
}
