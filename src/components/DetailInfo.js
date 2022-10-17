import React, { Component, Fragment } from 'react';
import {Table, Row, Col} from 'react-bootstrap'
import styles from './../css/detail.module.css';
import styled from 'styled-components';

const DetailInfo = () => {
    return (
        <React.Fragment>
            <Row className={styles.selling}>
                <Col sm={12}><strong>수량정보</strong></Col>
                <Col sm={12}>
                    <ul>
                        <li>1인 구매 하실 수 있는 최고 수량은 20개 입니다.</li>
                    </ul>
                </Col>
            </Row>

            <Row className={styles.selling}>
                <Col sm={12}><strong>배송정보</strong></Col>
                <Col sm={12}>
                    <ul>
                        <li>출고 및 도착 예정일은 결제 완료 시점 기준으로 산정됩니다.</li>
                        <li>오늘출발 지역의 경우 오늘출발으로 지정배송됩니다. (장바구니에서 배송지 입력 후 확인할 수 있습니다.)</li>
                        <li>오늘출발의 경우 출고일 다음날 오전 7시 전 도착 예정입니다.</li>
                        <li>택배 및 개별배송의 경우 제품 배송 준비 과정으로 인해 1~3일 후 도착 예정입니다. (제주 및 도서산간 지역은 1~2일 추가 소요)</li>   
                        <li>택배사의 사정에 따라 실제 도착일은 다를 수 있습니다.</li>
                    </ul>
                </Col>
                <Table striped className={styles.infoTable}>
                    <caption>배송정보</caption>
                    <tbody>
                        <tr>
                            <th scope='col'>배송</th>
                            <td>화물택배상품</td>
                        </tr>
                        <tr>
                            <th scope='col'>도서산간 추가 배송비</th>
                            <td>15,000원</td>
                        </tr>
                        <tr>
                            <th scope='col'>배송불가 지역</th>
                            <td>배송불가 지역이 없습니다.</td>
                        </tr>
                        <tr>
                            <th scope='col'>비례 배송비</th>
                            <td>주문 상품 개수에 비례하여 배송비 부과</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            
            <Row className={styles.selling}>
                <Col sm={12}><strong>교환/환불</strong></Col>
                <Table striped className={styles.infoTable}>
                    <caption>교환/환불</caption>
                    <tbody>
                        <tr>
                            <th scope='col'>반품배송비</th>
                            <td>15,000원 (최초 배송비가 무료인 경우 30,000원 부과)</td>
                        </tr>
                        <tr>
                            <th scope='col'>교환배송비</th>
                            <td>30,000원</td>
                        </tr>
                        <tr>
                            <th scope='col'>보내실 곳</th>
                            <td>(01234) 서울 강남구 도산대로56-7 그린상가 4F 그린몰</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

            <Row className={styles.selling}>
                <Col sm={12}>
                    <strong>반품/교환 사유에 따른 요청 가능 기간
                        <span>반품 시 먼저 판매자와 연락하셔서 반품사유, 택배사, 배송비, 반품지 주소 등을 협의하신 후 반품상품을 발송해 주시기 바랍니다.</span>
                    </strong>
                    
                    <ul>
                        <li>구매자 단순 변심은 상품 수령 후 7일 이내 (구매자 반품배송비 부담)</li>
                        <li>표시/광고와 상이, 상품하자의 경우 상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일 이내.</li>
                        <li>둘 중 하나 경과 시 반품/교환 불가 (판매자 반품배송비 부담)</li>
                    </ul>
                </Col>
            </Row>
            
            <Row className={styles.selling}>
                <Col sm={12}>
                    <strong>반품/교환 불가능 사유
                        <span>아래와 같은 경우 반품/교환이 불가능합니다.</span>
                    </strong>
                    
                    <ul>
                        <li>반품요청기간이 지난 경우</li>
                        <li>구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우 (단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)</li>
                        <li>포장을 개봉하였으나 포장이 훼손되어 상품가치가 현저히 상실된 경우 (예: 식품, 화장품)</li>
                        <li>구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 (라벨이 떨어진 의류 또는 태그가 떨어진 명품관 상품인 경우)</li>
                        <li>시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우 (예: 식품, 화장품)</li>
                        <li>고객주문 확인 후 상품제작에 들어가는 주문제작상품</li>
                        <li>복제가 가능한 상품 등의 포장을 훼손한 경우 (CD/DVD/GAME/도서의 경우 포장 개봉 시)</li>
                    </ul>
                </Col>
            </Row>

            <Row className={styles.selling}>
                <Col sm={12}><strong>판매자 정보</strong></Col>
                <Table striped className={styles.infoTable}>
                    <caption>판매자 정보</caption>
                    <tbody>
                        <tr>
                            <th scope='col'>상호</th>
                            <td>그린몰</td>
                        </tr>
                        <tr>
                            <th scope='col'>대표자</th>
                            <td>최하연, 조보름</td>
                        </tr>
                        <tr>
                            <th scope='col'>사업장소재지</th>
                            <td>(01234) 서울 강남구 도산대로56-7 그린상가 4F 그린몰</td>
                        </tr>
                        <tr>
                            <th scope='col'>고객센터 전화번호</th>
                            <td>010-9876-5432</td>
                        </tr>
                        <tr>
                            <th scope='col'>E-mail</th>
                            <td>green_mall@green.mall</td>
                        </tr>
                        <tr>
                            <th scope='col'>사업자 등록번호</th>
                            <td>000-00-0000</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </React.Fragment>
    );
}

export default DetailInfo;