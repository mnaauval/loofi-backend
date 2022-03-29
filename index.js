const express = require("express");
// const stripe = require("stripe")("sk_test_51KXNo4BnzSnZyZ7M2nPDwaVS39ByBK5tEXnSEMvNEkECmer6XeHwLOIPENFChsiN0zAk7TlpwiW2kYxg6Ze8pqXB009FqIpRwa");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productsRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// app.post("/api/checkout/payment", (req, res) => {
//   stripe.charges.create(
//     {
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     },
//     (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         return res.status(500).json(stripeErr);
//       } else {
//         return res.status(200).json(stripeRes);
//       }
//     }
//   );
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
