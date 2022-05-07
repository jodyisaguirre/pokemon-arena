import React, {useRef} from 'react'



export default function SearchBar(props){
    const { searchTerm, onChange, placeHolder} = props
    const inputElement = useRef("")

    function searchValue(){
        onChange(inputElement.current.value)
    }

    return(
        <div>
            search: <input type="text" name="searchTerm"   ref={inputElement} value={searchTerm} onChange={searchValue} placeholder={placeHolder}></input>

        </div>
    )
}