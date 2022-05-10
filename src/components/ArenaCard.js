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
        attack,
        defense,
        index,
        name,
        type,
        returnToRoster,
        url,
    } = props
    return(
        <Fragment>
            <Card className={"CardContainer"}>
                <CardContent>
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
                        name={"Return"}
                        color={"success"}
                        onClick={() => {returnToRoster(index)}}
                    />
                </CardActions>
            </Card>
        </Fragment>
    )

}