const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

/* import routes */
const transactions = require("./routes/transactions");
const suppliers = require("./routes/supplier");
const customers = require("./routes/customer");
const goods = require("./routes/goods");
const employees = require("./routes/employee");
/* import errorGandler */
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
  Add public folder to be static folder
  It means that public folder will be save files such as images, videos, documents, and other static files
  So, you just can get images with /images/:imageName
*/
app.use(fileUpload());
app.use(express.static("public"));

/* use routes */
app.use("/transactions", transactions);
app.use("/suppliers", suppliers);
app.use("/customers", customers);
app.use("/goods", goods);
app.use("/employees", employees);

app.use(errorHandler);

app.listen(3000, () => console.log("Port: 3000"));
