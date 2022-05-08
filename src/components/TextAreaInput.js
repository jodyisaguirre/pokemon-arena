import React from 'react'
import {TextField} from "@mui/material";


export default function TextAreaInput(props){
    const {label,name, handleChange ,value, placeholder} = props

    return(
        <TextField id="filled-basic"
                   name={name}
                   value={value}
                   onChange={(e)=>{handleChange(e)}}
                   label={label}
                   placeholder={placeholder}
                   variant="filled"
                   className={"input"}
        />
    )
}