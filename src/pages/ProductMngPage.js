/**
 * @desc 상품관리 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import addComma from "../Utils";

const ProductMngPage = (props) => {

  const SERVER_URL = "http://localhost:4000";

  // 상품정보
  const [productInfo, setProductInfo] = useState({
    product_nm: "",
    product_summary: "",
    item_price: "",
    category: "",
    brand_nm: "",
  });

  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  // 처음 렌더링 시 실행
  useEffect(() => {
    getProductList();
  }, []);

  /**
   * 상품 리스트 가져오기
   *
   * @param {string} categoryId 카테고리ID
   * @return
   */
  const getProductList = function () {
    const url = `${SERVER_URL}/api/products`;

    axios
      .get(url)
      .then(function (res) {
        let data = res.data;

        for (let key in data) {
          data[key].image = `${SERVER_URL}/images/` + data[key].image; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        props.setProductList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 상세정보 가져오기
   *
   * @param {string}
   * @return
   */
  const getProductDetail = (idx) => {
    const url = `${SERVER_URL}/api/products/detail`;
    const data = {
      product_id: idx, // product_id 로 상품 상세정보 조회
    };

    axios
      .post(url, data)
      .then(function (res) {
        let data = res.data;

        data.image = `${SERVER_URL}/images/` + data.image;

        props.setProductDetail(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 상세정보 등록
   *
   * @param
   * @return
   */
  const registerItem = function (e) {
    e.preventDefault();

    const url = `${SERVER_URL}/api/register`;

    const formData = new FormData();
    formData.append("productDetail", JSON.stringify(props.productDetail));
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
          setIsModalOpen(false);
          getProductList();
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
        console.log(err);
      });
  };

  /**
   * input value 가져오기
   *
   * @param
   * @return
   */
  const getValue = (e) => {
    let { name, value } = e.target;

    props.setProductDetail({
      ...props.productDetail,
      [name]: value,
    });
  };

  // 상품 등록/수정 버튼 클릭시
  const editProduct = (idx) => {
    setIsModalOpen(true);

    if (typeof idx == "number") {
      getProductDetail(idx);
    } else {
    }
  };

  // 이미지 업로드시 이미지 프리뷰
  const onChangeImage = (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg(reader.result);

        resolve();
      };
    });
  };

  return (
    <React.Fragment>
      <Container>
        <div style={{ textAlign: "right", margin: "10px 0" }}>
          <Button onClick={editProduct}>상품 등록</Button>
        </div>

        <ProductList
          productList={props.productList}
          Button={Button}
          addComma={addComma}
          editProduct={editProduct}
        />

        {isModalOpen && (
          <ProductForm
            productDetail={props.productDetail}
            registerItem={registerItem}
            getValue={getValue}
            setContent={setContent}
            setIsModalOpen={setIsModalOpen}
            previewImg={previewImg}
            onChangeImage={onChangeImage}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default ProductMngPage;
