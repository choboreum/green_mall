import React, {Fragment, useCallback, useState, useEffect} from 'react';
import { Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addCount, addItem, minusCount, deleteCount } from './../store/Store'
import styles from './../css/cart.module.css';

const CartPage = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, title, price, stock, delivery, freeDelivery } = props;

    const state = useSelector((state)=>{
        return state
    })
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState('장바구니가 비었습니다 🧺')

    return (
        <React.Fragment>
            <Container id='wrap'>
                <div className={styles.userBox}>{state.user.name}의 장바구니</div>
               <Table>
                        <caption>green mall {state.user.name}의 장바구니 내역</caption>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>상품명</th>
                            <th>수량</th>
                            <th>가격</th>
                            <th>배송</th>
                            <th>수량 변경하기</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.cart.map((a, i) => {
                                return(
                                    <tr key={i}>
                                        {state.cart[i] != 1 ?
                                            <>
                                                <td>{state.cart[i].id}</td>
                                                <td>{state.cart[i].name}</td>
                                                <td>{state.cart[i].count}</td>
                                                <td>{state.cart[i].price}</td>
                                                <td>{state.cart[i].delivery}</td>
                                                <td>
                                                <button onClick={()=>{
                                                    dispatch(addCount(state.cart[i].id))
                                                }}>+</button>
                                                    <button onClick={()=>{
                                                    dispatch(minusCount(state.cart[i].id))
                                                }}>-</button>
                                                    </td>
                                                    <td><button onClick={(e)=>{
                                                    dispatch(deleteCount(e.target.parentElement.parentElement));
                                                }}>삭제</button></td>
                                            </>
                                            :<td rowSpan={6}>장바구니가 비었습니다 🧺</td>
                                        }
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                

            </Container>
        </React.Fragment>
    );
}
  
  export default CartPage;