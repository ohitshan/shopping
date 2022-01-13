import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';



const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {

  const [name, setName] = useState('');
  const [descrip, setDescrip] = useState('');
  const [price, setPrice] = useState('');
  const [continent, setContinent] = useState(1);
  const [image, setImage] = useState([]);

  const onNameChange = (e) => setName(e.currentTarget.value);
  const onDescripChange = (e) => setDescrip(e.currentTarget.value);
  const onPriceChange = (e) => setPrice(e.currentTarget.value);
  const onContiChange = (e) => setContinent(e.currentTarget.value);

  const Continents = [
    { key: 1, value: "Africa" },
    { key: 2, value: "Europe" },
    { key: 3, value: "Asia" },
    { key: 4, value: "North America" },
    { key: 5, value: "South America" },
    { key: 6, value: "Australia" },
    { key: 7, value: "Antarctica" },
  ]

  const updateImages = (newImages) => {
    setImage(newImages)
  }

  const submitHandler = (e) => {
    e.preventDefault();
   
    if (!name || !descrip || !price || !continent || !image) {
      return alert("put all stuff")
    }

    const body = {
      writer: props.user.userData._id,
      title: name,
      description: descrip,
      price: price,
      images: image,
      continents: continent

    }

    Axios.post("/api/product", body)
      .then(response => {
        if (response.data.success) {
          alert('success to upload')
          props.history.push('/')
        } else {
          alert('fail to upload')
        }
      })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'cneter', marginBottom: "2rem" }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form onSubmit={submitHandler}>
          <FileUpload refreshFunction={updateImages} />
          <br />
          <br />
          <label>이름</label>
          <Input value={name} onChange={onNameChange} />
          <br />
          <br />
          <label>설명</label>
          <TextArea value={descrip} onChange={onDescripChange} />
          <br />
          <br />
          <label>가격($)</label>
          <Input value={price} onChange={onPriceChange} />
          <br />
          <br />
          <select onChange={onContiChange}>
            {Continents.map(conti =>
              <option key={conti.key} value={conti.key}>{conti.value}</option>
            )}
          </select>
          <br />
          <br />
          <Button onClick={submitHandler}>
            확인
          </Button>
      </Form>
    </div>
  )
}

export default UploadProductPage

