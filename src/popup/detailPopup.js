import React, { Component, Fragment, useState } from 'react';
import { Select, InputNumber } from 'antd';
import { useDispatch } from 'react-redux'
import { addItem } from '../store/Store'
import './../css/modal.css';
import 'antd/dist/antd.css';
import styled from 'styled-components';

const DetailPopup = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, title, price } = props;

    //select
    const { Option } = Select;
    const handleChange = (value) => {
    console.log(`selected ${value}`);
    };

    //option-count&price
    const addCount = function(type) {
        count++;

        setCount(count);
        let total = price * count;
        setTotalPrice(totalPrice);
    }
    
    const minusCount = function() {
        count--;
    
        setCount(count);
        let total = price * count;
        setTotalPrice(totalPrice);
    }
    
    let [count, setCount] = useState(1);  // 수량
    let [totalPrice, setTotalPrice] =  useState();  // 총금액

    // cart
    const dispatch = useDispatch()

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
                <Select defaultValue="disabled" onChange={handleChange}>
                    <Option value="disabled" disabled>[필수] 제품 옵션을 선택해주세요</Option>
                    <Option value="product">{title}</Option>
                </Select>
                <Select defaultValue="disabled" onChange={handleChange}>
                    <Option value="disabled" disabled>[필수] 택배 옵션을 선택해주세요</Option>
                    <Option value="product">새벽배송</Option>
                    <Option value="product">택배배송</Option>
                </Select>
                <div className='priceBox'>
                    <p className='hidden'>가격: {price}</p>
                    <div>
                        <div className='countBox'>
                            <span className='hidden'>수량:</span>
                            <button onClick={addCount}>+</button>
                            {count}
                            <button onClick={minusCount}>-</button>
                        </div>
                        <p className='totalPrice'>주문 금액 <span>{totalPrice}원</span></p>
                    </div>
                </div>
                
            </main>
            <footer>
                <button className="cart" onClick={(props)=>{
                    dispatch(addItem( {id: 2, name: 'product 3', price: 'price', count: 1} ))
                    //console.log(addItem( {id: 2, name: {title}, price: {price}, count: 1} ))
                    alert('장바구니에 추가 되었습니다.')
                    close()
                }}>담기</button>
            </footer>
            </section>
        ) : null}
        </div>
    );
};

export default DetailPopup;