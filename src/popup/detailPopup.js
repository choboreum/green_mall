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
    let [select, setSelect] =  useState('1');  // 옵션선택

    //select ex3
    const onSelect = (event) => {
        console.log(event);
        console.log(event.target.value);
        setSelect(event.target.value);
    }

    //select ex2
    /*const [formValue, setFormValue] = useState({
        value: "disabled",
        name: "[필수] 택배 옵션을 선택해주세요",
    });
    console.log(formValue);
    console.log(setFormValue);*/

    //select ex
    const [Selected, setSelected] = useState("");

    const selectList = [
        { value: "disabled", name: "[필수] 택배 옵션을 선택해주세요"},
        { value: "delivery01", name: "오늘출발"},
        { value: "delivery02", name: "일반배송"},
    ];

    const handleSelect = (e) => {
        setSelected(e.target.value);
        console.log(e.target.value)
    };

    //select
    const { Option } = Select;
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const handleChange02 = (value) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        console.log(value.value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
        setSelect(value)
        
        if(value.value == 'disabled') alert('다시 선택해주세요')
    };

    const checkDelivery = () => {
        if(setSelect == 'disabled') alert('다시 선택해주세요')
        else alert('선택 완료 되었슴니다.')
    }

    let salePrice = (price*(100-sale)) /100

    //option-count&price
    const addCount = function(type) {
        if(count < stock) count++;
        else if(count >= 20) alert('1인 구매 하실 수 있는 최대 수량은 '+{stock}+'개 입니다.')

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
                <Select
                    labelInValue
                    defaultValue={{value: 'disabled'}}
                    onChange={handleChange02}
                >
                    <Option value="disabled" disabled>[필수] 택배 옵션을 선택해주세요</Option>
                    <Option value="delivery01">오늘출발</Option>
                    <Option value="delivery02">일반배송</Option>
                </Select>
                <select onChange={(e)=>{
                    onSelect(e)
                    handleSelect(e)
                }} value={select} >
                    <option value="1" disabled>[필수] 택배 옵션을 선택해주세요</option>
                    <option value="2">오늘출발</option>
                    <option value="3">일반배송</option>
                </select>
                {/*<select onChange={(e)=>{
                    const selected = e.target.value;
                    setSelected(selected)
                    handleSelect(e)
                }} value={Selected} option={selectList} >
                    {selectList.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>*/}
                {/*<select
                    onChange={handleSelect}
                    value={Selected}
                    option={selectList}
                    setValue={(value) => {
                    setFormValue((state) => ({
                        // name을 제외한 나머지 값들도 얕은복사로 가져오기.
                        ...state,
                        name: value
                    }));
                }}>
                    {selectList.map((item) => (
                        <option
                            key={item.value}
                            value={item.value}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>*/}
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
                <div className='cart'>
                    <button className="cart" value={setSelect} onClick={()=>{
                        //dispatch(addItem( {id: {id}, name: {title}, price: {totalPrice}, count: {count}} ))
                        //checkDelivery()
                        {
                            select === '1' ?
                                alert('again~~~~')
                                : alert('ok~~~~~')
                        }
                    }}
                    >담기</button>
                </div>
            </main>
            </section>
        ) : null}
        </div>
    );
};

export default DetailPopup;