const express = require("express");
const app = express();
const transactions = require("./routes/transactions");
const customers = require("./routes/customer");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/transactions", transactions);
app.use("/customers", customers);

app.use(errorHandler);

app.listen(3000, () => console.log("Port: 3000"));
