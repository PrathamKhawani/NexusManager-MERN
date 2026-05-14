import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute.js"
import authRoute from "./routes/authRoute.js"
import cors from "cors"

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.warn("MongoDB connection failed. Running in disconnected mode.");
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.use("/api", userRoute);
app.use("/api/auth", authRoute);