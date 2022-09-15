import React, { Component, Fragment } from 'react';
import {Row, Col} from 'react-bootstrap'
import styles from './../css/detail.module.css';
import styled from 'styled-components';

const DeliverylInfo = () => {
    return (
        <React.Fragment>
            <Row className={`mt20 mb20 pt20 ${styles.delivery}`}>
                <Col sm={2}><strong>배송비</strong></Col>
                <Col sm={10}>3,000원 (5만원 이상 구매 시 무료)</Col>
                <Col sm={12}>
                    <ul>
                        <li>배송 상품 5만원 이상 주문 시 무료배송입니다. (단, 무료배송 상품 금액 제외)</li>
                        <li>택배 및 개별배송의 경우 제주 및 도서산간 지역의 배송비가 추가될 수 있습니다.</li>
                    </ul>
                </Col>
            </Row>
            <Row className={`mt20 mb20 pt20 ${styles.delivery}`} >
                <Col sm={2}><strong>배송정보</strong></Col>
                <Col sm={10}>새벽배송: 지금 주문하면 8월 15일(월) 오전 7시 전 도착<br />
                        택배배송: 지금 주문하면 8월 16일(화) 출고 예정</Col>
            </Row>
        </React.Fragment>
    );
}

export default DeliverylInfo;