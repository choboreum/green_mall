/**
 * @desc 서버 및 DB 연동
 * @author hy
 * @since 2022.08.23
 * */

const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: "./public/images/",
  filename: function (req, file, cb) {
    cb(null, "imgfile" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

/**
 * MYSQL DB 설정
 */
const connection = mysql.createConnection({
  host: "luves9631.cafe24.com",
  user: "luves9631",
  password: "cool4961*",
  database: "luves9631",
  port: "3306",
  multipleStatements: true, // 데이터가 buffer로 전송되는 문제 해결 위해 추가
  typeCast: function (field, next) {
    if (field.type == "VAR_STRING") {
      return field.string();
    }
    return next();
  },
});

connection.connect();

app.use(cors()); // 클라이언트 CORS 문제 해결 위해 추가
app.use(bodyParser.urlencoded({ extended: true })); // req.body가 undefined 되는 문제 해결 위해 추가
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("서버 정상 실행중");
});

/**
 * API
 */

/**
 * 상품 리스트 가져오기
 */
app.get("/api/products", (req, res) => {
  const sqlQuery = "SELECT * FROM TBGM_PRODUCT ORDER BY RGST_DATE DESC";

  connection.query(sqlQuery, function (err, results) {
    if (err) {
      console.log(err);
      console.log("데이터 가져오기 실패");
    } else {
      console.log(results);
      res.send(results);
    }
  });
});


/**
 * 상품 상세정보 가져오기
 */
 app.post("/api/products/detail", (req, res) => {
  const data = req.body;
  let prdid = data.product_id;

  let sqlQuery = `SELECT * FROM TBGM_PRODUCT WHERE PRODUCT_ID = ${prdid}`;

  connection.query(sqlQuery, function (err, results) {
    if (err) {
      console.log(err);
      console.log("데이터 가져오기 실패");
    } else {
      console.log(results[0]);
      res.send(results[0]);
    }
  });
});

/**
 * 상품 단건 삭제
 */
 app.delete("/api/products/delete", (req, res) => {
  const data = req.body;
  let prdid = data.product_id;

  let sqlQuery = `DELETE FROM TBGM_PRODUCT WHERE PRODUCT_ID = ${prdid}`;

  connection.query(sqlQuery, function (err, results) {
    if (err) {
      console.log(err);
      console.log("데이터 삭제 실패");
    } else {
      console.log(results[0]);
      res.send(results[0]);
    }
  });
});

/**
 * 상품 상세정보 등록
 */
app.post("/api/register", upload.single("img"), (req, res) => {  
  const data =  JSON.parse(req.body.productForm);   

  const insertData = [];
  const sqlQuery = "INSERT INTO TBGM_PRODUCT (CATEGORY, PRODUCT_NM, SALE_PRICE, DISCOUNTED_RATE, DELIVERY_DVSN, DETAIL_CONTENT, IMAGE, RGST_DATE) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())";

  for (let key in data) {
    insertData.push(data[key]);
  }

  console.log(req.file.filename);

  // console.log(insertData);
  insertData.push(req.body.detailContent);
  insertData.push(req.file.filename);

  connection.query(
    sqlQuery,
    insertData,
    function (err, rows, fields) {
      if (err) {
        res.send(err);
        console.log(err);
        console.log("상품정보 등록 실패");
      } else {
        res.send({ errCode: 0 });
        console.log(rows);
        console.log("상품정보 등록 성공");
      }
    }
  );
});


/**
 * 회원가입 API
 */
app.post("/api/signup", (req, res) => {

  let data = req.body;

  const insertData = [];
  const sqlQuery = "INSERT INTO TBGM_USER (USER_NM, PASSWORD, EMAIL_ID, RGST_DATE) VALUES (?, ?, ?, NOW())";

  for (let key in data) {
    insertData.push(data[key]);
  }

  connection.query(
    sqlQuery,
    insertData,
    function (err, rows, fields) {
      if (err) {
        res.send(err);
        console.log(err);
        console.log("회원가입 실패");
      } else {
        res.send({ errCode: 0 });
        console.log(rows);
        console.log("회원가입 성공");
      }
    }
  );
});


/**
 * 로그인 API
 */
app.post("/api/login", (req, res) => {
  const data = req.body;
  let email_id = data.email_id;

  let sqlQuery = `SELECT * FROM TBGM_USER WHERE EMAIL_ID = '${email_id}'`;

  connection.query(sqlQuery, function (err, results) {
    if (err) {
      console.log(err);
      console.log("데이터 가져오기 실패");
    } else {
      console.log(results[0]);
      res.send(results[0]);      
    }
  });
});
