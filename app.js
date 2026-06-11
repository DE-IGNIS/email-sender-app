// tips 
// can replace bodyParser with express.json
// always hide sensitive info using .env

const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");

require("dotenv").config();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/send-email", (req, res) => {
  const { recipient, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "matrixmind211@gmail.com",
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occured: ", error);
      res.status(500).json({
        message: "Error in sending email. Please try again later",
      });
    } else {
      console.log("Email send: ", info.response);
      res.status(200).json({
        message: "Email send successfully",
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
