/**
 * @desc 상품 카테고리 페이지
 * @author hy
 * @since 2022.08.23
 */

import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import addComma from "../Utils.js";
import { Container } from "react-bootstrap";
import { Row, Col, Dropdown, Menu, Space, Tag, Spin, Skeleton } from "antd";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

// 카테고리 페이지
const CategoryPage = () => {
  let { id } = useParams(); // 카테고리 id
  let [products, setProducts] = useState([]); // 상품 리스트 []
  let [productCnt, setProductCnt] = useState(0); // 상품 갯수 number
  let [selected, setSelected] = useState("신상품순"); // 선택 정렬옵션
  let [cateTitle, setCateTitle] = useState(""); // 카테고리별 제목
  let [heart, setHeart] = useState(false); // 찜 하트
  let [saleType, setSaleType] = useState(false);
  let [loading, setLoading] = useState(false);

  // 정렬 드롭다운 메뉴
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <button onClick={() => itemSort(1)}>낮은가격순</button>,
        },
        {
          key: "2",
          label: <button onClick={() => itemSort(2)}>높은가격순</button>,
        },
        {
          key: "3",
          label: <button onClick={() => itemSort(3)}>신상품순</button>,
        },
        {
          key: "4",
          label: <button onClick={() => itemSort(4)}>할인율순</button>,
        },
      ]}
    />
  );

  useEffect(() => {
    if (id === "sale") {
      setSaleType(true);
    } else {
      setSaleType(false);
    }
    setLoading(true);
    getData();
    pageTitle(id);
    setSelected("신상품순");
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
          data[key].IMAGE = `${SERVER_URL}/images/` + data[key].IMAGE; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
        }

        // 상품의 카테고리와 useParam의 id가 일치하는 리스트만 담기
        let copy = data.filter((item) => {
          return item.CATEGORY === id;
        });

        setProducts(copy);
        setProductCnt(copy.length);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /**
   * 상품 정렬 기능
   * @param sort_type (1: 낮은가격순, 2: 높은가격순, 3:신상품순, 4:할인율순)
   */
  const itemSort = function (sort_type) {
    let copy = [...products];

    switch (sort_type) {
      case 1:
        copy.sort((a, b) => {
          return parseFloat(a.SALE_PRICE) - parseFloat(b.SALE_PRICE);
        });
        setSelected("낮은가격순");
        break;
      case 2:
        copy.sort((a, b) => {
          return parseFloat(b.SALE_PRICE) - parseFloat(a.SALE_PRICE);
        });
        setSelected("높은가격순");
        break;
      case 3:
        copy.sort((a, b) => {
          return parseFloat(new Date(b.RGST_DATE) - new Date(a.RGST_DATE));
        });
        setSelected("신상품순");
        break;
      case 4:
        copy.sort((a, b) => {
          return b.DISCOUNTED_RATE - a.DISCOUNTED_RATE;
        });
        setSelected("할인율순");
        break;
      default:
        console.log("default case");
        break;
    }

    setProducts(copy);
  };

  /**
   * 카테고리별 제목 추가
   * @param
   */
  const pageTitle = function (id) {
    let title = "";

    switch (id) {
      case "furniture":
        title = "🛋가구";
        break;
      case "plant":
        title = "🪴식물/데코";
        break;
      case "pet":
        title = "🦮반려동물";
        break;
      default:
        break;
    }

    setCateTitle(title);
  };

  /**
   * 하트 채우기
   * @param
   */
  const fillHeart = function () {
    if (heart == false) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  };

  return (
    <Fragment>
      <div className="flex" style={{ marginBottom: "10px" }}>
        <span className="tit-lg">{cateTitle}</span>
        {loading ? <Spin indicator={antIcon} /> : null}
      </div>
      <div className="flex">
        <span className="tit-sm">{productCnt}개의 상품</span>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div style={{cursor: "pointer"}}>
            <span className="txt-md mr5">{selected}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <Row gutter={26}>
        {products.map((a, i) => {
          return (
            <Fragment key={i}>
              <Col onClick={() => {document.location.href=`/detail/${a.PRODUCT_ID}`;}} span={12} style={{ margin: "18px 0" }}>
                {a.IMAGE !== "" ? (
                  <img
                    src={a.IMAGE}
                    alt=""
                    style={{ width: "100%", borderRadius: "12px" }}
                  />
                ) : (
                  ""
                )}
                <p className="txt-md">
                  {a.PRODUCT_NM}
                </p>
                <div>
                  <span
                    style={{
                      color: "#27ae60",
                      fontWeight: 700,
                      marginRight: "5px",
                    }}
                  >
                    {a.DISCOUNTED_RATE}%
                  </span>
                  <del className="txt-sm" style={{color: "#999"}}>
                    {addComma(a.SALE_PRICE)} 원
                  </del>
                </div>
                <p className="tit-md" style={{fontWeight: "700"}}>
                  {addComma((a.SALE_PRICE * (100 - a.DISCOUNTED_RATE)) / 100)}{" "}
                  원
                </p>

                {a.DELIVERY_DVSN === "오늘출발" ? (
                  <Tag color="purple">
                    <TbTruckDelivery /> {a.DELIVERY_DVSN}
                  </Tag>
                ) : null}

                {a.FREE_DELIVERY_DVSN === "무료배송" ? (
                  <Tag color="blue">
                    {a.FREE_DELIVERY_DVSN}
                  </Tag>
                ) : null}

                <button className="heartButton" onClick={fillHeart}>
                  {heart ? (
                    <IoMdHeart style={{ color: "#ff4800" }} />
                  ) : (
                    <IoMdHeartEmpty />
                  )}
                </button>
              </Col>
            </Fragment>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default CategoryPage;
