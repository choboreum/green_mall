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
 * 카테고리별 상품 가져오기
 */
app.get("/api/products/:categoryId", (req, res) => {
  const cate = req.params.categoryId;
  let sqlQuery = "";

  switch(cate) {
    case "all": 
      sqlQuery = `SELECT * FROM TBGM_PRODUCT`;
      break;
    default:
      sqlQuery = `SELECT * FROM TBGM_PRODUCT WHERE CATEGORY = '${cate}'`;
      break;  
  }
  // const sqlQuery = `SELECT * FROM TBGM_PRODUCT WHERE CATEGORY = '${cate}'`;

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
 * 상품 상세정보 등록
 */
app.post("/api/register", upload.single("img"), (req, res) => {
  const data =  JSON.parse(req.body.productDetail);   

  const insertData = [];
  const sqlQuery = "INSERT INTO TBGM_PRODUCT (PRODUCT_NM, PRODUCT_SUMMARY, ITEM_PRICE, CATEGORY, BRAND_NM, IMAGE, RGST_DATE) VALUES (?, ?, ?, ?, ?, ?, NOW())";

  for (let key in data) {
    insertData.push(data[key]);
  }

  console.log(req.file.filename);

  // console.log(insertData);

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
