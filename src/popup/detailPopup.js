import React, { Component, Fragment, useState, useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux'
import { addItem } from '../store/Store'
import './../css/modal.css';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import addComma from "../Utils";
import {today} from "@progress/kendo-react-dateinputs/dist/es/messages";
import Title from 'antd/lib/skeleton/Title';

const DetailPopup = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, id, title, price, sale, stock, delivery, freeDelivery } = props;

    let [count, setCount] = useState(1);  // 수량
    let [totalPrice, setTotalPrice] =  useState('');  // 총금액
    let [select, setSelect] =  useState('1');  // 제품옵션선택

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
        setSelect(event.target.value);
        if(event.target.value === '2') console.log(event.target.value, '제품 설정 완료')
    }

    //option-count&price
    let salePrice = (price*(100-sale)) /100
    const addCount = function() {
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
        dispatch(addItem( {
                id: id,
                name: title,
                price: totalPrice,
                count: count,
                delivery: delivery
            } ))
    }

    useEffect(()=>{
        console.log(id)

        let getId = localStorage.getItem('watched') //로컬스토리지에 담을 watched를 꺼내서, 변수 getId에 담는다
        // debugger;
        console.log(getId)

        getId = JSON.parse(getId) //꺼낸 getId는 JSON자료이기 때문에 array/object로 바꿔 다시 변수에 담는다
        getId.push(id) //변수에 title.id를 자료를 추가한다

        getId = new Set(getId) //중복방지
        getId = Array.from(getId) //중복방지된 자료를 array로 담는다=중복방지가 되면서 array형식으로 담음
        // debugger;
        console.log(getId)

        localStorage.setItem('watched', JSON.stringify(getId)) //getId는 array/object이기 떄문에 다시 JSON으로 변환하여 로컬스토리지에 담는다
        // debugger;
        console.log(localStorage.getItem('watched'))
    }, [])

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
                <select className='selectBox' onChange={(e)=>{
                    onSelect(e)
                    handleSelect(e)
                }} value={select} >
                    <option value="1" disabled>[필수] 제품 옵션을 선택해주세요</option>
                    <option value="2">{title}</option>
                </select>
                <Select defaultValue="delivery" onChange={handleChange}>
                    <Option value="delivery" disabled>{delivery}</Option>
                </Select>
                
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
                    if(select === '1') alert('제품 옵션을 선택해주세요 🛒')
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