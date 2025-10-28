import express from "express";
import cors from "cors";
const app = express();

import userRoutes from "./Route/User";
import profileRoutes from "./Route/Profile";
import courseRoutes from "./Route/Course";
import paymentRoutes from "./Route/Payment";
import contactUsRoute from "./Route/Contact";
import database from "./Configuration/Database";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./Configuration/Cloudinary";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(cors()); // enable CORS
app.options("*", cors()); // allow preflight for all routes

app.use(express.json());
app.use(cookieParser());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Welcome To Learnify",
	});
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});


