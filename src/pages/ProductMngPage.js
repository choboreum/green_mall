/**
 * @desc 상품관리 화면 (관리자)
 * @author hy
 * @since 2022.08.24
 * */

 import React, { Fragment, useEffect, useState } from "react";
 import axios from "axios";
 import { Button, Input, Form, Radio, Modal, message } from "antd";
 import ProductList from "../components/ProductList";
 import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 
 const ProductMngPage = () => {
   const SERVER_URL = "http://localhost:4000";
 
   // 상품 리스트 []
   const [productList, setProductList] = useState([]);
 
   // 상품 상세정보 {}
   const [productDetail, setProductDetail] = useState({});
 
   // 상품 등록 input {}
   const [productForm, setProductForm] = useState({
     category: "",
     product_nm: "",
     sale_price: "",
     discounted_rate: "",
     delivery_dvsn: "",
   });
 
   const [img, setImg] = useState("");
   const [previewImg, setPreviewImg] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editYn, setEditYn] = useState(false);
   const [detailContent, setDetailContent] = useState("");
 
   const handleOk = () => {
     setIsModalOpen(false);
   };
 
   const handleCancel = () => {
     setIsModalOpen(false);
   };
 
   const handleChange = (e) => {
     setProductForm({ [e.target.name]: e.target.value });
   };
 
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
           data[key].IMAGE = `${SERVER_URL}/images/` + data[key].IMAGE; // 이미지 경로 세팅. DB에는 파일명만 저장되기 때문에 경로로 다시 변환해주기
         }
 
         setProductList(data);
       })
       .catch(function (err) {
         console.log(err);
       });
   };
 
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
     formData.append("productForm", JSON.stringify(productForm));
     formData.append("detailContent", detailContent);
     formData.append("img", img);
 
     axios
       .post(url, formData)
       .then(function (res) {
         if (res.data.errCode == 0) {
           message.success({
             content: "상품정보 등록 성공",
             className: "custom-class",
           });
           setIsModalOpen(false);
           getProductList();
         } else {
           message.error({
             content: "상품정보 등록 실패",
             className: "custom-class",
           });
         }
         console.log(res);
       })
       .catch(function (err) {
         console.log(err);
       });
   };
 
   // 상품 삭제
   const deleteProduct = (idx) => {
     const url = `${SERVER_URL}/api/products/delete`;
     const postData = {
       data: {
         product_id: idx,
       },
     };
 
     axios
       .delete(url, postData)
       .then(function (res) {
         message.success({
           content: "상품정보 삭제 성공",
           className: "custom-class",
         });
         getProductList();
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
 
     setProductForm({
       ...productForm,
       [name]: value,
     });
   };
 
   // 상품 등록/수정 버튼 클릭시
   const editProduct = (props) => {
     setIsModalOpen(true);
     setProductDetail(props);
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
     <Fragment>      
       <div className="flex" style={{ marginBottom: "10px" }}>
         <span className="tit-lg">상품관리</span>
         <Button type="primary" onClick={editProduct}>
           상품 등록
         </Button>
       </div>
 
       <ProductList
         productList={productList}
         editProduct={editProduct}
         deleteProduct={deleteProduct}
       />
 
       <Modal
         title="상품 등록"
         open={isModalOpen}
         onOk={handleOk}
         onCancel={handleCancel}
         width={700}
         footer={[
           <Button type="primary" key="submit" onClick={registerItem}>
             등록
           </Button>,
         ]}
       >
         {editYn ? (
           // 수정 모드
           <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
             <h3>상품 기본정보</h3>
             <p>{productDetail.PRODUCT_NM}</p>
             <p>{productDetail.SALE_PRICE}</p>
             <Form.Item label="카테고리">
               <Radio.Group name="category" onChange={getValue}>
                 <Radio value="furniture">가구</Radio>
                 <Radio value="plant">식물/데코</Radio>
               </Radio.Group>
             </Form.Item>
             <Form.Item label="상품명">
               <Input
                 name="product_nm"
                 value={productDetail.PRODUCT_NM}
                 onChange={getValue}
               />
             </Form.Item>
             <Form.Item label="대표이미지">
               {productForm.IMAGE ? (
                 <img
                   src={productForm.IMAGE}
                   style={{ width: "120px", border: "1px solid #ccc" }}
                   alt=""
                 />
               ) : (
                 <img
                   src={process.env.PUBLIC_URL + "/noimg2.png"}
                   alt=""
                   style={{ width: "120px", border: "1px solid #ccc" }}
                 />
               )}
               <Input
                 type="file"
                 onChange={(e) => {
                   onChangeImage(e.target.files[0]);
                   setImg(e.target.files[0]);
                 }}
               />
             </Form.Item>
             <Form.Item label="상품가격">
               <Input name="sale_price" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="할인율">
               <Input name="discounted_rate" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="배송구분">
               <Radio.Group name="delivery_dvsn" onChange={getValue}>
                 <Radio value="일반배송">일반배송</Radio>
                 <Radio value="오늘출발">오늘출발</Radio>
               </Radio.Group>
             </Form.Item>
           </Form>
         ) : (
           // 등록 모드
           <Form labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
             <h6>상품 기본정보</h6>
             <Form.Item label="카테고리">
               <Radio.Group
                 name="category"
                 // value="furniture"
                 onChange={getValue}
               >
                 <Radio value="furniture">가구</Radio>
                 <Radio value="plant">식물/데코</Radio>
                 <Radio value="pet">반려동물</Radio>
               </Radio.Group>
             </Form.Item>
             <Form.Item label="상품명">
               <Input name="product_nm" onChange={getValue} />
             </Form.Item>
             <Form.Item label="대표이미지">
               {previewImg ? (
                 <img
                   src={previewImg}
                   style={{ width: "120px", border: "1px solid #ccc" }}
                   alt=""
                 />
               ) : (
                 <img
                   src={process.env.PUBLIC_URL + "/noimg2.png"}
                   alt=""
                   style={{ width: "120px", border: "1px solid #ccc" }}
                 />
               )}
               <Input
                 type="file"
                 onChange={(e) => {
                   onChangeImage(e.target.files[0]);
                   setImg(e.target.files[0]);
                 }}
               />
             </Form.Item>
             <Form.Item label="상품가격">
               <Input name="sale_price" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="할인율">
               <Input name="discounted_rate" type="number" onChange={getValue} />
             </Form.Item>
             <Form.Item label="배송구분">
               <Radio.Group
                 name="delivery_dvsn"
                 value="일반배송"
                 onChange={getValue}
               >
                 <Radio value="일반배송">일반배송</Radio>
                 <Radio value="오늘출발">오늘출발</Radio>
               </Radio.Group>
             </Form.Item>
             <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setDetailContent(data);
            }}
          />
           </Form>
         )}
       </Modal>
     </Fragment>
   );
 };
 
 export default ProductMngPage;
 