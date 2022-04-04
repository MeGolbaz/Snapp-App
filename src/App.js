import './App.css';
import axios from 'axios';
import footerImage from "../src/Footer.png";
import headerImage from "../src/Header.png";
import React, { useEffect, useState } from 'react';
import { Card, Row, Button, CardGroup, Image, Col, ButtonGroup } from 'react-bootstrap';


function App() {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(5)
  const [limit, setLimit] = useState(4);
  const handlePage = (pageNum) => {
    setPage(pageNum)
  }


  useEffect(() => {
    axios("https://api.snapp.express/mobile/v2/product-variation/index?filters=%7B%7D&fetch_filters=1&fetch_categories=1&menu_category_id=390176&vendorCode=po9qzk&page=0&client=PWA&optionalClient=PWA&deviceType=PWA&appVersion=5.6.6&optionalVersion=5.6.6&UDID=ca69b564-a46e-4b71-a59b-6e08975ac8d3")
      .then((response) => {
        let data = response.data.data.product_variations;
        setData(data);
        // console.log(data);
        let paginationCount = Math.ceil(data.length / limit);
        setPageCount(paginationCount)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {


  }, [limit, data])

  if (loading) return "Loading...";
  if (error) return "Error!";

  return (
    <div className='body'>
      <section>
        <Row>
          <Col sm={12}>
            <a href='https://snapp.market/'>
              <Image className='headerImage' src={headerImage} />
            </a>
          </Col>
        </Row>
        <Row className='market'>
          <Col xs={8} md={4}>
            <Button className='font' variant="primary" size="sm" disabled>تغییر فروشگاه</Button>
          </Col>
          <Col xs={8} md={8}>
            <h5 className='font'>.شما در حال مشاهده کالاهای موجود در هایپراستار صبا هستید</h5>
          </Col>
        </Row>
        <br />
        <Row>
          {data.slice(limit * (page - 1), limit * page).map(product => {
            return (
              <CardGroup className="cardGroupStyle" style={{ flex: 1 }}>
                <Card className="cardStyle" border="primary" >
                  <Card.Img variant="top" src={product.images[0].imageSrc} />
                  <Card.Body>
                    <Card.Title className='font'><h4>{product.productVariationTitle}</h4></Card.Title>
                    <br />
                    <Button role="button" variant="outline-primary" direction="right">افزودن به سبد</Button>
                  </Card.Body>
                </Card>
                <br />
              </CardGroup>
            )
          })
          }
        </Row>
        <br />
        <Row className='border'>
          <h5 className='more'>
            :مشاهده بیشتر
          </h5>
          <Row>
            <ButtonGroup className='click' size="sm">
              {Array.from(Array(pageCount).keys()).map((empty, i) => {
                return <Button key={i} onClick={() => handlePage(i + 1)}>{i + 1}</Button>
              })
              }
            </ButtonGroup>
          </Row>
        </Row>
        <Row>
          <Col sm={12}>
            <a href='https://snapp.market/'>
              <Image className="footerImage" src={footerImage} />
            </a>
          </Col>
        </Row>
      </section>
    </div>
  );

};

export default App;




































