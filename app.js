import express from "express";

const app = express();

app.get("/get",(req,res)=>{
    res.json({message:[{name:"Hello"}]})
});
const port = process.env.PORT || 3030;
app.listen(port, ()=>{
    console.log(`server run at port : ${port}`)
})