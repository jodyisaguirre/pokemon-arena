import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';
import BasicButton from "./BasicButton";
import {Fragment, useEffect, useState} from "react";




export default function ViewAllCard(props){
    const {
        name,
        attack,
        defense,
        type,
        index,
        url,
        nextSlide,
        previousSlide,
        lastSlide
    } = props
    return(
        <Fragment>
            <Card className={"CardContainer"}>
                <CardContent >
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <img src={url}/>
                    <Typography color="text.secondary" gutterBottom>
                       Attack: {attack}
                    </Typography>
                    <Typography color="text.secondary">
                       Defense: {defense}
                    </Typography>
                    <Typography color="text.secondary">
                       Type: {type}
                    </Typography>
                </CardContent>
                <CardActions>
                    <BasicButton
                        name={"Previous"}
                        // buttonAction={handlePreviousSlide}
                        color={"success"}
                        disabled={index === 0}
                        onClick={previousSlide}
                    />

                    <BasicButton
                        name={"Select For Fight"}
                        // buttonAction={(e)=>{handleSelect(e,index);handleSlideSelect()}}
                    />
                    <BasicButton
                        name={"Delete"}
                        color={"error"}
                    />
                    <BasicButton
                        name={"Next"}
                        onClick={nextSlide}
                        color={"success"}
                        disabled={index === lastSlide}
                    />

                </CardActions>
            </Card>
        </Fragment>
    )

}