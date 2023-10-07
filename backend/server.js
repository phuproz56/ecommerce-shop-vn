const express = require("express");
const { dbConnect } = require("./utils/db");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const socket = require("socket.io");

const server = http.createServer(app);

require("dotenv").config();

const port = process.env.PORT;
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

var allCustomer = [];
const addUser = (customerId, socketId, userInfo) => {
  const checkUser = allCustomer.some((u) => u.customerId === customerId);
  if (!checkUser) {
    allCustomer.push({
      customerId,
      socketId,
      userInfo,
    });
  }
};

io.on("connection", (soc) => {
  console.log("socket server is connected...");
  soc.on("add_user", (customerId, userInfo) => {
    addUser(customerId, soc.id, userInfo);
    // console.log(allCustomer);
  });
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", require("./routes/chatRoutes"));

// HOME route
app.use("/api/home/", require("./routes/home/homeRoutes"));
app.use("/api", require("./routes/home/customerAuthRoutes"));
app.use("/api", require("./routes/home/cardRoutes"));
app.use("/api", require("./routes/order/orderRoutes"));

// DASHBOARD route
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/dashboard/categoryRoutes"));
app.use("/api", require("./routes/dashboard/productRoutes"));
app.use("/api", require("./routes/dashboard/sellerRoutes"));

app.get("/", (req, res) => res.send("Hello World!"));

dbConnect();
server.listen(port, () => console.log(`Server is running on port ${port}`));
