"use client"

import { Box, Button, Switch, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export type props = {
    info: any,
    onRemove: () => void,
    onSwitch: (clicked: any) => void
}

export default function TasksInfo({info, onRemove, onSwitch}: props) {
    const [clicked, setClicked] = useState(info.clicked)
   
    const test = () => {
        setClicked(!clicked)
    }

    useEffect(()=> {onSwitch(clicked)},[clicked])

    return (
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "red solid 2px", borderTop: "red solid 2px", borderRadius: "12px"}}>
            <Typography sx={{color: "white", mt: 1, fontSize: "1.5rem"}}>{info.title}</Typography>
            <Typography sx={{color: "white", fontSize: "1.2rem"}}>{info.content}</Typography>
            {clicked ? 
            <Switch defaultChecked onChange={test}/>
            :
            <Switch onChange={test}/>
            }
            <Button sx={{color: info.clicked ? "green" : "red"}} onClick={onRemove}>Completed</Button>
        </Box>
    )
}