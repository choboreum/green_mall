import React, { Fragment } from "react";
import { Container, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";

const DetailPage = (props) => {
  let { id } = useParams();
  console.log(typeof id);
  console.log(props.productList);

  let copy = props.productList.filter((item) => {
    return item.product_id == id;
  });

  console.log(copy[0]);

  return (
    <React.Fragment>
      <Container>
        {copy[0].product_id}
        {copy[0].product_nm}
        {copy[0].item_price}
        {copy[0].brand_nm}
      </Container>
    </React.Fragment>
  );
};

export default DetailPage;
