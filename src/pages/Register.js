/**
 * @desc 상품정보 등록 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import "@progress/kendo-theme-default/dist/all.css";

const Register = () => {
  // 상품정보
  const [productInfo, setProductInfo] = useState({
    product_nm: "",
    product_summary: "",
    item_price: "",
    category: "",
    brand_cd: "",
    brand_nm: "",
  });

  const [content, setContent] = useState("");
  const [products, setProducts] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const SERVER_URL = "http://localhost:4000";

  // 처음 렌더링 시 실행
  useEffect(() => {
    getData();
  }, []);

  /**
   * 상품 데이터 DB에 등록
   *
   * @param
   * @return
   */
  const registerItem = function (e) {
    e.preventDefault();

    const url = `${SERVER_URL}/api/register`;

    const formData = new FormData();
    formData.append("productInfo", JSON.stringify(productInfo));
    formData.append("img", content);

    axios
      .post(url, formData)
      .then(function (res) {
        if (res.data.errCode == 0) {
          swal({
            text: "상품정보를 성공적으로 등록했습니다.",
            icon: "success",
            button: "확인",
          });
        } else {
          swal({
            text: "상품정보 등록중 오류가 발생했습니다.",
            icon: "error",
            button: "확인",
          });
        }
        console.log(res);
      })
      .catch(function (err) {
        swal({
          text: "서버 접속중 오류가 발생했습니다.",
          icon: "error",
          button: "확인",
        });
        console.log(err);
      });
  };

  /**
   * 카테고리별 상품 데이터 가져오기
   *
   * @param {string} categoryId 카테고리ID
   * @return
   */
  const getData = function (categoryId) {
    let url = "";
    if (categoryId) {
      url = `${SERVER_URL}/api/products/${categoryId}`;
    } else {
      url = `${SERVER_URL}/api/products/all`;
    }

    axios
      .get(url)
      .then(function (res) {
        let data = res.data;

        for (let key in data) {
          data[key].image = `${SERVER_URL}/images/` + data[key].image; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        setProducts(res.data);
      })
      .catch(function (err) {
        swal({
          text: "서버 접속중 오류가 발생했습니다.",
          icon: "error",
          button: "확인",
        });
        console.log(err);
      });
  };

  /**
   * 상품 상세정보 가져오기
   *
   * @param {string} categoryId 카테고리ID
   * @return
   */
  const setData = (e) => {
    console.log(e);

    let copy = products.filter((item) => {
      return item.product_nm == 21;
    });

    // setProduct_nm(copy[0].product_nm);
  };

  /**
   * input value 가져오기
   *
   * @param
   * @return
   */
  const getValue = (e) => {
    let { name, value } = e.target;

    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  const imgCell = (props) => {
    return (
      <td>
        <img
          src={props.dataItem.image}
          style={{ width: 60, height: 60, borderRadius: "10px" }}
          alt="이미지"
        />
      </td>
    );
  };

  const MyEditCommandCell = (props) => {
    return (
      <td>
        <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          onClick={() => enterEdit(props.dataItem)}
        >
          Edit
        </button>
      </td>
    );
  };

  const enterEdit = (item) => {
    setOpenForm(true);
    // setEditItem(item);
  };

  return (
    <React.Fragment>
      <Container>
        <Button
          onClick={() => {
            console.log("");
          }}
        >
          상품 등록
        </Button>

        {/* 상품 리스트  */}
        <Grid
          data={products}
          style={{
            height: "600px",
            overflow: "auto",
          }}
          className="g-k-grid"
        >
          <GridColumn title="상품이미지" field="image" cell={imgCell} />
          <GridColumn title="상품명" field="product_nm" />
          <GridColumn title="상품가격" field="item_price" />
          <GridColumn title="카테고리" field="category" />
          <GridColumn cell={MyEditCommandCell} />
        </Grid>

        {openForm && <EditForm registerItem={registerItem} getValue={getValue} setContent={setContent}/>}
      </Container>
    </React.Fragment>
  );
};


function EditForm(props) {  

  return (
    <Form>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>브랜드명</Form.Label>
      <Form.Control type="text" name="brand_nm" onChange={props.getValue} />
      <Form.Label>브랜드코드</Form.Label>
      <Form.Control type="text" name="brand_cd" onChange={props.getValue} />
      <Form.Label>상품명</Form.Label>
      <Form.Control type="text" name="product_nm" onChange={props.getValue} />
      <Form.Label>판매가격</Form.Label>
      <Form.Control type="number" name="item_price" onChange={props.getValue} />
      <Form.Label>상품설명</Form.Label>
      <Form.Control
        as="textarea"
        style={{ height: "100px" }}
        name="product_summary"
        onChange={props.getValue}
      />
    </Form.Group>
    <Form.Select name="category" onChange={props.getValue}>
      <option>카테고리</option>
      <option value="furniture">가구</option>
      <option value="plant">식물/데코</option>
      <option value="interior">인테리어</option>
    </Form.Select>

    <Form.Label>상품대표이미지</Form.Label>
    <Form.Control type="file" onChange={(e) => props.setContent(e.target.files[0])} />

    <Button onClick={props.registerItem} style={{ margin: "16px 0" }}>
      상품 등록
    </Button>
  </Form>
  )
}

export default Register;
