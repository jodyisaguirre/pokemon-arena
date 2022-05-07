import React, {useRef} from 'react'

export default function DropDown(props){
    const {dropDownOptions, dropDownValue}= props
    const selectElement = useRef("")

    const handleDropDownValue = () => {
        dropDownValue(selectElement.current.value)
    }

    return(
        <select ref={selectElement} onChange={handleDropDownValue} >
            {
                dropDownOptions.map(type =>  <option key={type}>{type}</option>)
            }
        </select>
    )
}