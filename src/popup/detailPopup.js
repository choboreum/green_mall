import React, { Component, Fragment, useState, useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux'
import { addItem } from '../store/Store'
import './../css/modal.css';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import addComma from "../Utils";

const DetailPopup = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, id, title, price, sale, stock } = props;

    let [count, setCount] = useState(1);  // 수량
    let [totalPrice, setTotalPrice] =  useState('');  // 총금액
    //const [Selected, setSelected] = useState(""); // 제품옵션선택
    let [select, setSelect] =  useState('1');  // 배달옵션선택

    //select
    const { Option } = Select;
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const handleSelect = (e) => {
        setSelect(e.target.value);
        console.log(e.target.value)
    };
    const onSelect = (event) => {
        console.log(event);
        console.log(event.target.value);
        setSelect(event.target.value);
    }

    //option-count&price
    let salePrice = (price*(100-sale)) /100
    const addCount = function(type) {
        if(count < stock) count++;
        else if(count >= stock) alert('1인 구매 하실 수 있는 최대 수량은 '+ stock +'개 입니다.')

        setCount(count);
        let totalPrice = salePrice * count;
        setTotalPrice(totalPrice);
    }
    const minusCount = function() {
        if(count > 1) count--;
        else if(count <= 1) alert('1인 구매 하실 수 있는 최소 수량은 1개 입니다.')
    
        setCount(count);
        let totalPrice = salePrice * count;
        setTotalPrice(totalPrice);
    }

    // cart
    const dispatch = useDispatch()
    const goCart = () => {
        alert('장바구니에 담겼습니다 🧺')
        close()
    }

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
            <section>
            <header>
                {header}
                <button className="close" onClick={close}>
                &times;
                </button>
            </header>
            <main>
                <Select defaultValue="product" onChange={handleChange}>
                    <Option value="product" disabled>{title}</Option>
                </Select>
                <select className='selectBox' onChange={(e)=>{
                    onSelect(e)
                    handleSelect(e)
                }} value={select} >
                    <option value="1" disabled>[필수] 택배 옵션을 선택해주세요</option>
                    <option value="2">오늘출발</option>
                    <option value="3">일반배송</option>
                </select>
                <div className='priceBox'>
                    <p className='hidden'>가격: {addComma(salePrice)}</p>
                    <sup>현재 재고 : {stock}개</sup>
                    <div>
                        <div className='countBox'>
                            <span className='hidden'>수량:</span>
                            <button onClick={addCount}>+</button>
                            {count}
                            <button onClick={minusCount}>-</button>
                        </div>
                        <p className='totalPrice'>주문 금액 <span>{addComma(salePrice*count)}원</span></p>
                    </div>
                </div>
            </main>
            <footer>
                <button className="cart" onClick={()=>{
                    //dispatch(addItem( {id: {id}, name: {title}, price: {totalPrice}, count: {count}} ))
                    if(select === '1') alert('택배 옵션을 선택해주세요 🚛')
                    else goCart()
                }}
                >담기</button>
            </footer>
            </section>
        ) : null}
        </div>
    );
};

export default DetailPopup;