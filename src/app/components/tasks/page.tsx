"use client"
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TasksInfo from "../taskinfo/page";


export default function Tasks() {
    
    const image = "img/test2.png"
    
    const [AllTasks, setAllTasks] = useState<any[]>([])
    const [initialiced, setinitialiced] = useState(false)

    const [markerPosition, setMarkerPosition] = useState({ x: screen.width / 2, y: Math.floor(Math.random() * screen.height) });

    const [title, setTitle] = useState("")
    const [content, setContnet] = useState("")


    const [switchClicked, setSwitchClicked] = useState(false)

    function mouseClicked(event:any) {
        const { clientX, clientY } = event;
        console.log(clientX, clientY)
    setMarkerPosition({ x: clientX - 12.5, y: clientY - 12.5});
    }

    function saveCheckPoint() {
        if(title.length == 0) {

        }
        else {
            setAllTasks([
                ...AllTasks,
                {title: title, content: content, mrkx: markerPosition.x + 12.5, mrky: markerPosition.y + 12.5, clicked: false}
            ])
        }
            
        
    }

    function removeTask(index: number) {
        if(AllTasks[index].clicked == true) {
            setAllTasks((oldTasks:any[]) => {
                const history: any[] = JSON.parse(localStorage.getItem("taskHistory") || "[]")
                const removedInArray = oldTasks.filter((task, i) => i == index)
                removedInArray.forEach(removed => history.push(removed))
                localStorage.setItem("taskHistory", JSON.stringify(history))
                return oldTasks.filter((task, i) => i !== index)
            })
        }
    }

    function updateClick(index: number, switched: boolean) {
        const newTasks = [...AllTasks]
        newTasks[index].clicked = switched
        setAllTasks(newTasks)
    }

    function restore() {
        console.log("test")
    }

    useEffect(()=> {
        if(initialiced == false) 
            return

        localStorage.setItem("tasks", JSON.stringify(AllTasks))
    },[AllTasks])

    useEffect(()=> {
        setAllTasks(JSON.parse(localStorage.getItem("tasks") || "[]"))
        setinitialiced(true)
    },[])

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", maxHeight: "100vh", backgroundColor: "#1D1D1D", overflow: "hidden"}}>
            <Box sx={{display: "flex", justifyContent: "flex-end", alignItems: "center", backgroundColor: "#1D1D1D", flexDirection: "column", p: "40px 0"}}>
                
            </Box>
            
            <Box sx={{width: "30%", Height: "100vh", backgroundColor: "#1D1D1D", display: "flex", flexDirection: "column", p: 2}}>
                <Box sx={{borderBottom: "red solid 2px"}}>
                    <Typography sx={{fontSize: "2rem", textAlign: "center", color: "white", textShadow: "red 2px 2px 4px", m: 2}}>Tasks | Check Points</Typography>    
                </Box>
                <Box sx={{mt: 2, textAlign: "center", overflow: "auto", padding: "0.5rem 0"}}>
                    {AllTasks.map((task: any, index: any) => (
                        <TasksInfo onSwitch={(switched) => updateClick(index, switched)} onRemove={() => removeTask(index)} key={task.mrkx +task.title + task.mrky} info={task}/>
                    ))}
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", mt: "auto", p: 2}}>
                    <Button onClick={saveCheckPoint} sx={{color: "white", m: 2, fontSize: "1.2rem", border: "red solid 1px", borderRadius: "12px"}}>Add Marker</Button>
                    <TextField onChange={(e) => setTitle(e.target.value)} color="error" sx={{border: "red solid 2px", backgroundColor: "white", mb: 2}} placeholder="Title"></TextField>
                    <TextField onChange={(e) => setContnet(e.target.value)} color="error" sx={{border: "red solid 2px", backgroundColor: "white"}} placeholder="Information"></TextField>
                    <Button href="history" sx={{color: "white", fontSize: "1.2rem", border: "red solid 1px", borderRadius: "12px", m: 2}}>History</Button>
                </Box>
            </Box>
            
            
            <Box onClick={mouseClicked} sx={{width: "100%", height: "100vh"}}>
                <Box sx={{backgroundImage: `url(${image})`, width: "100%", height: "100vh", backgroundSize: "cover",
                    backgroundPosition: "50% 75%", backgroundRepeat: "no-repeat", zIndex: "-5", m: 1}}>
                    {AllTasks.map((task: { mrky: any; title: any; mrkx: any; clicked: boolean; }) => (
                        <Box key={task.mrkx +task.title + task.mrky} sx={{position: "absolute", top: task.mrky, left: task.mrkx, height: "25px", width: "25px",
                        opacity: "50%", border: "white solid 1px", borderRadius: "50%", boxShadow: "white 1px 2px 2px", backgroundColor: task.clicked ? "green" : "red", transform: "translate(-50%, -50%)" }}/>

                    ))}
                    
                    <Box sx={{position: "absolute", top: markerPosition.y, left: markerPosition.x, height: "25px", width: "25px", backgroundColor: "orange", opacity: "50%",
                        border: "white solid 1px", borderRadius: "50%", boxShadow: "white 1px 2px 2px"}}/>
                    
                </Box>
            </Box>
            
        </Box>
    )
}