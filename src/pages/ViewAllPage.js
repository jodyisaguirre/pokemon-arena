import React, {Fragment, useEffect, useRef, useState} from 'react'
import ViewAllCard from "../components/VeiwAllCard";
import ArenaCard from "../components/ArenaCard";
import SearchBar from "../components/SearchBar";
import DropDown from "../components/DropDown";
import BasicButton from "../components/BasicButton";
import {Box, Modal, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchPokemonInitialData, TYPES} from "../actions";


export default function ViewAllPage(props){

    const pokemon = useSelector((state) => state.pokemon)
    const dispatch = useDispatch();
    const [index, setIndex] = useState(0)
    const [roster, setRoster] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [typeSearch, setTypeSearch] = useState("")
    const [dropDownOptions, setDropDownOption] = useState([])

    useEffect(()=>{
        dispatch(fetchPokemonInitialData())
    },[])

    useEffect(()=>{
        const uniqueType = [...new Set(pokemon.map(p => p.type).filter(type => type !== null))]
        const addAllOption = ["all",...uniqueType]
        setDropDownOption(addAllOption)
        setRoster(pokemon)
    },[pokemon])

    useEffect(()=>{
        if (typeSearch && typeSearch !== "all" && searchTerm && searchTerm !== ""){
            const filteredPokemon = pokemon.filter(p => {
                const searchTermCondition = p.name.toLowerCase().includes(searchTerm.toLowerCase())
                const typeSearchCondition = p.type.toLowerCase().includes(typeSearch.toLowerCase())
                return searchTermCondition && typeSearchCondition
            })
            setRoster(filteredPokemon)
            setIndex(0)
        }
        else if (searchTerm && searchTerm !== ""){
            const filteredPokemon = pokemon.filter(p => {
                return p.name.toLowerCase().includes(searchTerm.toLowerCase())
            })
            setRoster(filteredPokemon)
            setIndex(0)
        }
        else if((typeSearch && typeSearch !== "all") || (typeSearch !== "all" && searchTerm === "")){
            const filteredPokemon = pokemon.filter(p => {
                return p.type.toLowerCase().includes(typeSearch.toLowerCase())
            })
            setRoster(filteredPokemon)
            setIndex(0)
        }
        else{
            setRoster(pokemon)
        }
    },[searchTerm,typeSearch])

    const nextSlide = () =>{
       setIndex(index + 1)
    }
    const previousSlide = () =>{
        setIndex(index - 1)
    }
    const handleSelectForArena = (index) => {
        dispatch({
            type: TYPES.ADD_TO_ARENA,
            payload: roster[index]
        })
        setIndex(0)
    }
    function searchHandler(input){
        setSearchTerm(input)
    }
    function dropDownValue(input){
        setTypeSearch(input)
    }
    return(
        <Fragment>
            <div>
                <SearchBar
                    searchTerm={searchTerm}
                    onChange={searchHandler}
                    placeHolder={"Search For Fighter"}
                />
                <DropDown
                    dropDownOptions={dropDownOptions}
                    dropDownValue={dropDownValue}
                />
            </div>
            <div>
                {(roster.length > 0)
                    ?
                    <ViewAllCard
                        index={index}
                        name={roster[index]?.name}
                        type={roster[index]?.type}
                        attack={roster[index]?.attack}
                        defense={roster[index]?.defense}
                        url={roster[index]?.url}
                        nextSlide={nextSlide}
                        previousSlide={previousSlide}
                        sendToArena={handleSelectForArena}
                        lastSlide={roster?.length - 1}
                        disableSelect={roster.length === 2}
                    />
                    :
                    <h3>
                        No PokeMon Results Available
                    </h3>
                }
            </div>
        </Fragment>
    )
}