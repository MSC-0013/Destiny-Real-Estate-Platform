// Load environment variables
const path = require("path");
require("dotenv").config();
if (!process.env.PORT && !process.env.MONGO_URI) {
  require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { connectToDatabase } = require("./config/db");

const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const propertyRoutes = require("./routes/properties");
const contactRoutes = require("./routes/contact");
const constructionRoutes = require("./routes/construction");
const wishlistRoutes = require("./routes/wishlist");

const app = express();
const PORT = process.env.PORT || 8080;

// ================= CORS =================
// Read allowed origins from .env (comma separated list)
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
  : [];

// Allow CORS for allowed origins and localhost
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS: " + origin));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// ================= ROUTES =================
// Base route
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "Destiny Backend",
    version: "1.0.0",
    allowedOrigins,
  });
});

// Mount auth routes at /auth (so frontend can call /auth/login)
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/properties", propertyRoutes);
app.use("/contact", contactRoutes);
app.use("/construction", constructionRoutes);
app.use("/wishlist", wishlistRoutes);

// Legacy contact URL
app.get("/contact", (req, res) => {
  const { service, model, property } = req.query || {};
  res.json({
    ok: true,
    service: service || null,
    model: model || null,
    property: property || null,
  });
});

// Minimal SSR-like HTML for chatbot
app.get("/construction/chatbot", (req, res) => {
  const model = req.query.model || "";
  res.setHeader("Content-Type", "text/html");
  res.end(`<!doctype html>
  <html>
    <head><meta charset="utf-8"/><title>Construction Chatbot</title></head>
    <body>
      <h1>Construction Chatbot</h1>
      <p>Model: ${String(model)}</p>
      <p>Please use the frontend at /construction/chatbot?model=${String(
        model
      )} to submit details.</p>
    </body>
  </html>`);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// ================= DB CONNECTION =================
connectToDatabase(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Destiny backend running on http://localhost:${PORT}`);
      console.log(`✅ Allowed frontend URLs: ${allowedOrigins.join(", ")}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
