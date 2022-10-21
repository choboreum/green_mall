import React, { Component, Fragment, useEffect, useState } from "react";

import {
  Button,
  Stack,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import styles from "./../css/detail.module.css";
import styled from "styled-components";
import Detailinfo from "../components/DetailInfo";
import DeliverylInfo from "../components/deliveryInfo";
import DetailPopup from "../popup/detailPopup";
import ReactHtmlParser from "react-html-parser";

const DetailPage = () => {
  let { id } = useParams(); // 카테고리 id
  const [productDetail, setProductDetail] = useState({}); // 상품 상세정보 {}
  const SERVER_URL = "http://localhost:4000";

  // 처음 렌더링 시 실행
  useEffect(() => {
    // 매개변수로 id를 넣어줘야 product_id값을 가져갈수 있어서 id를 넣어줘야 해
    getProductDetail(id);
  }, [id]);

  /**
   * 상품 단건 가져오기
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
        data.IMAGE = `${SERVER_URL}/images/` + data.IMAGE;
        setProductDetail(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <Container id="wrap">
        <div className="productTitle">
          <Row>
            <Col>
              <Image
                style={{
                  width: "100%",
                }}
                src={productDetail.IMAGE}
              />
            </Col>
          </Row>

          <Stack gap={0}>
            <p>{productDetail.PRODUCT_NM}</p>

            <p>{productDetail.SALE_PRICE}</p>

            <div className={styles.title}>
              {productDetail.PRODUCT_NM}
              <span>(7일 이내 무상반품)</span>
            </div>

            <div className={styles.price}>
              <s>{productDetail.SALE_PRICE}</s>
              <sup>{productDetail.DISCOUNTED_RATE}%</sup>
            </div>

            <div className={styles.salePrice}>
              <span>9,900</span>
            </div>
          </Stack>

          <DeliverylInfo />

          <div className="d-grid gap-2">
            <Button variant="secondary" onClick={openModal}>
              구매하기
            </Button>

            <DetailPopup
              open={modalOpen}
              close={closeModal}
              header="장바구니 담기"
              title={productDetail.PRODUCT_NM}
              price={productDetail.SALE_PRICE}
              sale={productDetail.DISCOUNTED_RATE}
              delivery={productDetail.DELIVERY_DVSN}
              freeDelivery={productDetail.FREE_DELIVERY_DVSN}
              stock={productDetail.STOCK}
            ></DetailPopup>
          </div>

          <Row className={`mt20 mb20 pt20`}>
            <Col sm={2}>
              <strong>상품 정보</strong>
            </Col>

            <Col sm={10}>용량, 수량: 상세정보 내 이미지 참고</Col>
          </Row>
        </div>

        <div className="productInfo">
          <Card>
            <Card.Body>
              {ReactHtmlParser(productDetail.DETAIL_CONTENT)}

              <Detailinfo></Detailinfo>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default DetailPage;
