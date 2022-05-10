import React , {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import ArenaCard from "../components/ArenaCard";
import BasicButton from "../components/BasicButton";
import {Box, Modal, Typography} from "@mui/material";
import {TYPES} from "../actions";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ArenaPage(){
    const arena = useSelector((state) => state.arena)
    const dispatch = useDispatch();
    const [winner, setWinner] = useState("")
    const [isFighting, setIsFighting] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    console.log(arena)

    function setToFalse (){
        setIsFighting(false)
        handleOpen()
    }
    function handleFight(){
        setIsFighting(true)
        setTimeout(setToFalse,2300)
        const winner = []
        arena.map((fighter) =>{
            winner.push(fighter.attack+fighter.defense)
        })
        if(winner[0]>winner[1]){
            setWinner(arena[0].name)
        }
        else{
            setWinner(arena[1].name)
        }
    }

    const handleReturnToRoster = (index) => {
        dispatch({
            type: TYPES.REMOVE_FROM_ARENA,
            payload: arena[index]
        })
    }

    return(
        <div className={"PokeStadium"}>
            <div className={"Arena"}>
                {
                    arena?.map((pokemon,index) =>
                        <ArenaCard
                            key={index}
                            index={index}
                            name={pokemon.name}
                            type={pokemon.type}
                            attack={pokemon.attack}
                            defense={pokemon.defense}
                            url={pokemon.url}
                            returnToRoster={handleReturnToRoster}
                        />
                    )
                }
            </div>
            <div>
                {(arena?.length >= 2)
                    &&
                    <div className={"buttonContainer"} >
                        {(!isFighting && !winner)&&
                            <BasicButton
                                className={"buttonColor"}
                                name={"Lets Get it on"}
                                color={"success"}
                                onClick={handleFight}
                            />}
                        {(isFighting) &&
                            <img src="https://media2.giphy.com/media/HZpCCbcWc0a3u/giphy.gif?cid=ecf05e47vbxelk7bxwnf0bu0rs0qxq28amnvjkszqjpzeksj&rid=giphy.gif&ct=g"/>
                        }

                    </div>
                }
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Winner!!!
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {winner.toUpperCase()}
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}