import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (v) => {
    const currentIndex = checked.indexOf(v);

    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(v)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)
    props.handleFilters(newChecked)

  }

  const renderCheckboxLists = () => props.list &&
    props.list.map((v, i) => (
      <React.Fragment key={i}>
        <Checkbox onChange={() => handleToggle(v._id)}
          checked={checked.indexOf(v._id) === -1 ? false : true} />
        <span>{v.name}</span>

      </React.Fragment>
    ))


  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>

      </Collapse>
    </div>
  )
}

export default CheckBox
