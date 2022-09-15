/**
 * @desc 상품 카테고리 페이지
 * @author hy
 * @since 2022.08.23
 */

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import addComma from "../Utils.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoHeartOutline } from "react-icons/io5";

const CategoryPage = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, [id]);

  const SERVER_URL = "http://localhost:4000";

  /**
   * 상품 카테고리 리스트 조회
   */
  const getData = function () {
    const url = `${SERVER_URL}/api/products`;

    axios
      .get(url)
      .then(function (res) {
        let data = res.data;

        for (let key in data) {
          data[key].image = `${SERVER_URL}/images/` + data[key].image; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        // 상품의 카테고리와 useParam의 id가 일치하는 리스트만 담기
        let copy = data.filter((item) => {
          return item.category === id;
        });

        setProducts(copy);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 정렬 기능
   */
  const itemSort = function (gubun) {
    let copy = [...products];

    if (gubun === "low") {
      // 낮은 가격순 정렬
      copy.sort((a, b) => {
        return parseFloat(a.item_price) - parseFloat(b.item_price);
      });
    } else {
      // 높은 가격순 정렬
      copy.sort((a, b) => {
        return parseFloat(b.item_price) - parseFloat(a.item_price);
      });
    }

    setProducts(copy);
  };

  return (
    <Fragment>
      <Container>
        <DropdownButton id="dropdown-basic-button" title="정렬">
          <Dropdown.Item onClick={() => itemSort("low")}>
            낮은 가격순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => itemSort("high")}>
            높은 가격순
          </Dropdown.Item>
        </DropdownButton>
        <Row>
          {products.map((a, i) => {
            return (
              <React.Fragment key={i}>
                <Col xs={6} style={{ margin: "18px 0", padding: "0 15px" }}>
                  {a.image !== "" ? (
                    <img
                      src={a.image}
                      alt=""
                      style={{ width: "100%", borderRadius: "12px" }}
                    />
                  ) : (
                    ""
                  )}
                  <p
                    style={{
                      fontSize: "12px",
                      margin: "10px 0 6px",
                      color: "#555",
                    }}
                  >
                    {a.brand_nm}
                  </p>
                  <h4 style={{ fontSize: "14px" }}>{a.product_nm}</h4>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#27ae60",
                    }}
                  >
                    {addComma(a.item_price)} 원
                  </span>
                  <button
                    style={{ border: 0, background: "none", fontSize: "13px" }}
                  >
                    <IoHeartOutline /> 0
                  </button>
                </Col>
              </React.Fragment>
            );
          })}
        </Row>
      </Container>
    </Fragment>
  );
};

export default CategoryPage;
