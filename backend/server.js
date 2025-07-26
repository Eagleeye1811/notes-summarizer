import express from 'express';
const app=express();

app.get('/',(req,res)=>{
    res.send("Hello from server!");
})

app.get('/signup',(req,res)=>{
    res.send("Hello from server!");
})

app.get('/login',(req,res)=>{
    res.send("Hello from server!");
})

app.get('/home',(req,res)=>{
    res.send("Render all the details to user along with subject playlists");
})
app.get('/create-chapter',(req,res)=>{
    res.send("Hello from server!");
})

app.get('/listen-audio',(req,res)=>{
    res.send("Hello from server!");
})

app.get('/quiz',(req,res)=>{
    res.send("Hello from server!");
})


const port=5000;
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})