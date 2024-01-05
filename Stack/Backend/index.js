import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import roomRouter from "./Routes/roomRoutes.js";
import accountRouter from "./Routes/accountRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

//cors
app.use(cors()); //allow all origins

/*
app.use(cors({
    origin: "http://localhost:5555",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));
*/


app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Hello World from Express!")
});

app.use("/rooms", roomRouter);
app.use("/accounts", accountRouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
          });
    })
    .catch((error) => {
        console.log(error);
    });

