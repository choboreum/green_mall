/** 
 * @desc 상품 리스트 화면
 * @auth hy
 * @since 2022.08.23
 * */ 

 import React, { Fragment, useEffect, useState } from 'react';
 import axios from 'axios';
 import swal from 'sweetalert';
 import addComma from '../Utils.js';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import Dropdown from 'react-bootstrap/Dropdown';
 import DropdownButton from 'react-bootstrap/DropdownButton';
 import Button from 'react-bootstrap/Button';
 import {IoHeartOutline} from "react-icons/io5";
 
 const Category = () => {
 
    // 처음 렌더링 시 실행
    useEffect(() => {
         getData()
        }, [])
        
    const [products, setProducts] = useState([]);

     // 상품 데이터 db에서 가져오기
     const getData = function () {
         const url = "http://localhost:4000/api/products";
 
         axios.get(url)
             .then(function(res) {
                // status가 200인 경우 여기로 들어옴
                setProducts(res.data);                                                                                                                                                  
                console.log(res);
             })
             .catch(function(err) {
                // 서버 자체에 에러가 있는 경우 여기로 빠짐. status가 200이 아닌 경우
                swal({
                    text: "서버 접속중 오류가 발생했습니다.",
                    icon: "error",
                    button: "확인",
                  });
                console.log(err);
             })
     }
 
     // 상품 정렬 기능
     const itemSort = function(gubun) {
        let prdCopy = [...products];
        
        if(gubun === "low") {   // 낮은 가격순 정렬
            prdCopy.sort((a, b) => {
                return parseFloat(a.item_price) - parseFloat(b.item_price);
            });
        } else {   // 높은 가격순 정렬
             prdCopy.sort((a, b) => {
                return parseFloat(b.item_price) - parseFloat(a.item_price);
            });
        }

        setProducts(prdCopy);
     }

    // [TODO] 상세페이지 이동
    const goDetail = () => {
        alert("[TODO] 상세페이지 이동 기능 추가 예정");
    } 
 

     return (
         <React.Fragment>           
              <Container>
                  {/* <Button variant="outline-dark" onClick={() => itemSort("low")}>낮은 가격순</Button>
                  <Button variant="outline-dark" onClick={() => itemSort("high")}>높은 가격순</Button> */}
                  <DropdownButton id="dropdown-basic-button" title="정렬">
                    <Dropdown.Item onClick={() => itemSort("low")}>낮은 가격순</Dropdown.Item>
                    <Dropdown.Item onClick={() => itemSort("high")}>높은 가격순</Dropdown.Item>
                  </DropdownButton>
                  <Row>
                     {
                         products.map((a, i) => {
                             return (
                                 <React.Fragment key={i}>
                                     <Col xs={6}>
                                         <p className='tit-sm'>{a.brand_nm}</p>
                                         <h4 style={{fontSize: "14px"}}>{a.product_nm}</h4>
                                         <span style={{fontSize: "15px", fontWeight: 600}}>{addComma(a.item_price)} 원</span>
                                         <button style={{border: 0, background: "none"}}><IoHeartOutline/> 0</button>
                                     </Col>
                                 </React.Fragment>   
                             )
                         })
                     }
                   </Row>
                </Container>
         </React.Fragment>
     );
   }
 
 
   export default Category;