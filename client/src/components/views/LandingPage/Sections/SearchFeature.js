import React, { useState } from 'react'
import { Input } from 'antd';
const { Search } = Input;

function SearchFeature(props) {

  const [Searchterm, setSearchterm] = useState('');

  const searchHandler = (e) => {
    setSearchterm(e.currentTarget.value)
    props.refreshFunction(e.currentTarget.value)
  }

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        value={Searchterm}
        style={{ width: 200 }}
      />
    </div>
  )
}

export default SearchFeature
