const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./utils/errors/errorHandler");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// home route
app.get("/", (req, res) => {
  res.json({ message: "Order Management System API" });
});

// routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  })
  .on("error", (err) => {
    console.error("Server startup error:", err);
  });

module.exports = app;
