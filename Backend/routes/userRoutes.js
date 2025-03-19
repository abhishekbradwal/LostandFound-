import express from "express";
import { register,login,logout, getUser, getEmployerdetailsBYID} from "../controllers/userControllers.js"; 
import {isAuthenticated} from "../middlewares/auth.js"
import cors from "cors";
import bodyParser from "body-parser";

const router = express.Router();

router.use(
    cors({
        origin: "*", // Replace "*" with specific domains for security
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

router.use((req, res, next) => {
    // Replace '*' with the appropriate origin(s) or configure it dynamically
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Add other allowed methods as needed
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

    // Add other allowed headers as needed
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    // Set cache-control headers to prevent caching
    res.setHeader(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    next();
});

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.get("/getemployee/:id",isAuthenticated,getEmployerdetailsBYID)

export default router;