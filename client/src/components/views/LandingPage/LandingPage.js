import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Icon, Col, Card, Row, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { continents, price } from './Sections/Datas'
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {

  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    continents: [],
    price: []
  });
  const [SearchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    let body = {
      skip: skip,
      limit: limit
    }

    getProducts(body);

  }, [])

  const getProducts = (body) => {
    Axios.post('/api/product/products', body)
      .then(response => {
        if (response.data.success) {
          if (body.loadMore) {
            setProducts([...products, ...response.data.productInfo])
          } else {
            setProducts(response.data.productInfo)
          }
          setPostSize(response.data.postSize)
        } else {
          alert("fail to bring product")
        }
      })
  }

  const seeMoreHandler = () => {

    let SkipforSeemore = skip + limit

    let body = {
      skip: SkipforSeemore,
      limit: limit,
      loadMore: true
    }

    getProducts(body)
    setSkip(SkipforSeemore)
  }

  const renderCards = products.map((product, i) => {

    return <Col lg={6} md={8} xs={24} key={i}>
      <Card
        cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
      >
        <Meta
          title={product.title}
          description={`$${product.price}`}
        />
      </Card>
    </Col>
  });

  const showFilterdResults = (filters) => {

    let body = {
      skip: 0,
      limit: limit,
      filters: filters,
    }
    getProducts(body)
    setSkip(0);
  }

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  }

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }

    newFilters[category] = filters
    console.log('filters', filters)

    if (category === "price") {
      let priceValues = handlePrice(filters)
      newFilters[category] = priceValues
    }
    showFilterdResults(newFilters)
    setFilters(newFilters)
  };


  const updateSearchTerm = (newSearchTerm) => {

    let body = {
      skip: 0,
      limit: limit,
      filters: Filters,
      searchTerm: newSearchTerm
    };

    setSkip(0)
    setSearchTerm(newSearchTerm)
    getProducts(body)
  }

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Let's travel <Icon type='rocket' /></h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
        </Col>
      </Row>


      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
        <SearchFeature
          refreshFunction={updateSearchTerm}
        />
      </div>

      <Row gutter={[16, 16]}>
        {renderCards}
      </Row>
      <br />
      {postSize >= limit &&
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={seeMoreHandler}>see more..</button>
        </div>
      }




    </div>
  )
}

export default LandingPage
