import React, { Component, Fragment } from 'react';
import {Row} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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

    //InputNumber
    const onChange = (value) => {
        console.log('changed', value);
    };

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
                    <Option value="disabled" disabled>[필수] 옵션을 선택해주세요</Option>
                    <Option value="product">{title}</Option>
                </Select>
                <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                <p className='price'>주문 금액 <span>{price}원</span></p>
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