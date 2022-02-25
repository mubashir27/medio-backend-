const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mubashir456",
  database: "DBPROJECT",
});

app.use(cors());

app.get("/", (req, res) => {
  const sqlInsert1 = "select MEDI_NAME, MEDI_TYPE from MEDICINE";
  console.log(sqlInsert1);
  db.query(sqlInsert1, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ data: result, error: false });
    }
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.post("/api/insert", (req, res) => {
  const cusName = req.body.cusName;
  const phoneNo = req.body.phoneNo;
  const age = req.body.age;
  const timing = req.body.timing;
  const medcinePerDay = req.body.medcinePerDay;
  const quantity = req.body.quantity;
  const str = req.body.str;

  const sqlInsert =
    "INSERT INTO CUSTOMER (Cust_Name,Cust_Phone,Age,requirement,Time,Days,Quantity) values (?,?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [cusName, phoneNo, age, str, timing, medcinePerDay, quantity],
    (err, result) => {
      console.log("sad " + err);
      console.log(result);
    }
  );
});

app.post("/api/MedicineForm", (req, res) => {
  const inventory = req.body.inventory;
  const medicineName = req.body.medicineName;
  const mfg = req.body.mfg;
  const exp = req.body.exp;
  console.log(typeof +"inventory" + inventory);
  console.log(typeof +"medicineName" + medicineName);

  const sqlInsert2 =
    "INSERT INTO STOCK (Medi_No,Stock_Quantity,Medi_Mfg,Medi_Exp) values (?,?,?,?);";
  db.query(sqlInsert2, [medicineName, inventory, mfg, exp], (err, result) => {
    console.log("asdasd " + err);
    console.log(result);
  });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
