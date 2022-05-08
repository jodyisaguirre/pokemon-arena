import React, {useState} from "react"
import TextAreaInput from "../components/TextAreaInput";
import BasicButton from "../components/BasicButton";



export default function CatchPage(props){
    const [stats,setStats]=useState({
        name:"",
        type:"",
        attack : "",
        defense:"",
        url:""
    })
    const handleChange = e => {
        setStats({
            ...stats,
            [e.target.name]: e.target.value,
        })
    }

    const submitPayload = () => {
        console.log(stats)
    }

    return(
        <div className={"PokeBallCard"}>
            <div className={"PokeBall"}>
                <form>
                    <TextAreaInput
                        type="text"
                        name="name"
                        value={stats.name}
                        handleChange={handleChange}
                        placeholder={"Name"}
                    />
                    <TextAreaInput
                        type="text"
                        name="type"
                        value={stats.type}
                        handleChange={handleChange}
                        placeholder={"Type"}
                    />
                    <TextAreaInput
                        type="text"
                        name="attack"
                        value={stats.attack}
                        handleChange={handleChange}
                        placeholder={"Attack"}
                    />
                    <TextAreaInput
                        type="text"
                        name="defense"
                        value={stats.defense}
                        handleChange={handleChange}
                        placeholder={"Defense"}
                    />
                    <TextAreaInput
                        type="text"
                        name="url"
                        value={stats.url}
                        handleChange={handleChange}
                        placeholder={"giphy Url"}
                    />
                </form>
                <BasicButton
                    name={"submit"}
                    buttonAction={submitPayload}
                    color={'error'}
                />
            </div>
        </div>
    )

}