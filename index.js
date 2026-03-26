const express = require("express");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./db/dbConnect");
require("dotenv").config();

// ── Common APIs ───────────────────────────────────────────────────────────────
const Logout = require("./apis/common/logout");
const Session = require("./apis/common/session");
const { Login } = require("./apis/common/login");
const { Signup } = require("./apis/common/signup");
const { ChangePassword } = require("./apis/common/changePassword");

// ── Public APIs ───────────────────────────────────────────────────────────────
const { GetCategories } = require("./apis/user/GetCategories");
const { GetRituals } = require("./apis/user/GetRituals");
const { GetPackages } = require("./apis/user/GetPackages");
const { GetPackageDetails } = require("./apis/user/GetPackageDetails");
const { GetFeedbacks } = require("./apis/user/GetFeedbacks");

// ── User APIs ─────────────────────────────────────────────────────────────────
const { UpdateProfile } = require("./apis/user/UpdateProfile");
const { AddPackageInquiry } = require("./apis/user/AddPackageInquiry");
const { MyPackageInquiries } = require("./apis/user/MyPackageInquiries");
const { AddGeneralInquiry } = require("./apis/user/AddGeneralInquiry");
const { MyGeneralInquiries } = require("./apis/user/MyGeneralInquiries");
const { AddFeedback } = require("./apis/user/AddFeedback");

// ─────────────────────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "travel_platform_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ── DB Connect ────────────────────────────────────────────────────────────────
connectDB();

// ─────────────────────────────────────────────────────────────────────────────
//  COMMON APIs
// ─────────────────────────────────────────────────────────────────────────────
app.post("/signup", Signup);
app.post("/login", Login);
app.get("/logout", Logout);
app.get("/session", Session);
app.post("/changePassword", ChangePassword);

// ─────────────────────────────────────────────────────────────────────────────
//  PUBLIC APIs (no auth required)
// ─────────────────────────────────────────────────────────────────────────────

// Categories
app.get("/categories", GetCategories);

// Rituals
app.get("/rituals", GetRituals);

// Travel Packages (filters: ?category_id= ?ritual_id= ?min_price= ?max_price=)
app.get("/packages", GetPackages);
app.get("/packages/:id", GetPackageDetails);

// Feedbacks (public display)
app.get("/feedbacks", GetFeedbacks);

// ─────────────────────────────────────────────────────────────────────────────
//  USER APIs (session required)
// ─────────────────────────────────────────────────────────────────────────────

// Profile
app.post("/user/updateProfile", UpdateProfile);

// Package Inquiries
app.post("/user/addPackageInquiry", AddPackageInquiry);
app.get("/user/myPackageInquiries", MyPackageInquiries);

// General Inquiries
app.post("/user/addGeneralInquiry", AddGeneralInquiry);
app.get("/user/myGeneralInquiries", MyGeneralInquiries);

// Feedback
app.post("/user/addFeedback", AddFeedback);


app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Travel Backend Started."
  })
})

// ─────────────────────────────────────────────────────────────────────────────
app.listen(PORT, () =>
  console.log(`✅ Travel Platform server started on PORT ${PORT}!`)
);
