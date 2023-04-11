import React, {useRef, useEffect, useState} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const LineDropdown = ({line,selectLine, setSelectLine, setUpload, lined}) => {    

  const handleChange = (item)=>{
    setSelectLine(item)
    setUpload(true)
    
  }
    return (
        <Dropdown  options={line} disabled={lined} onChange={handleChange}   value={selectLine.name} placeholder="Select Line"  />
      );
}

export default LineDropdown