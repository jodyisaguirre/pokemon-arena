import React from "react"
import {useDispatch, useSelector} from "react-redux";


export default function ArenaPage(){
   const state = useSelector((state) => state)
    const dispatch = useDispatch();


    return(
        <div>
            Welcome to the thunder dome
        </div>
    )
}