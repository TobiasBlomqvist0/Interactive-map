"use client"
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";


export default function history() {
    
    const storageHistory = JSON.parse(localStorage.getItem("taskHistory") || "[]")
    
    const [history, setHistory] = useState(storageHistory)

    function clearAllHistory() {
        localStorage.removeItem("taskHistory")
    }

    function removeOneHistory(index: number) {
        storageHistory.splice(index, 1)
        setHistory(storageHistory)
        console.log(history)
        localStorage.setItem("taskHistory", JSON.stringify(history))
    }

    return (
        <Box sx={{backgroundColor: "#1D1D1D", minHeight: "100vh", overflow: "auto", display: "flex", justifyContent: "center"}}>
            <Box sx={{width: "50%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Button href="/" sx={{color: "white", m: 2, fontSize: "1.2rem", border: "red solid 1px", borderRadius: "12px"}}>Close</Button>
                {history.map((item: any, index: number) => (
                    <Box key={item.mrky + item.title + item.mrkx} sx={{width: "250px", m: 2, display: "flex", flexDirection: "column", alignItems: "center", border: "red solid 1px", p: 2, borderRadius: "12px"}}>
                        <Typography onClick={()=> removeOneHistory(index)} sx={{color: "red", marginLeft: "auto"}}>X</Typography>
                        <Typography sx={{color: "white", fontSize: "1.5rem"}}>{item.title}</Typography>
                        <Typography sx={{color: "white", fontSize: "1.2rem"}}>{item.content >= 0 ? "Nothing was enterd": item.content}</Typography>
                        <Typography sx={{color: "green"}}>Completed</Typography>
                    </Box>
                ))}
                <Button onClick={clearAllHistory} sx={{color: "white", m: 2, fontSize: "1.2rem", border: "red solid 1px", borderRadius: "12px",mb: 2}}>Clear all</Button>
            </Box>
        </Box>
    )
}