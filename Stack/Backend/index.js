import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import roomRouter from "./Routes/roomRoutes.js";
import accountRouter from "./Routes/accountRoutes.js";
import bookingRouter from "./Routes/bookingRoutes.js";
import cors from "cors";
import http from "http";
import { setupWebSocket } from "./websocket.js";

const app = express();

app.use(express.json());

//cors
app.use(cors()); //allow everything

/*
app.use(cors({
    origin: "http://localhost:5555",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
}));
*/

//uni test
app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Hello World from Express!")
});


app.use("/rooms", roomRouter);
app.use("/accounts", accountRouter);
app.use("/bookings", bookingRouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        const server = http.createServer(app);
        setupWebSocket(server);        
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
          });
    })
    .catch((error) => {
        console.log(error);
    });

