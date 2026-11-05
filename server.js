
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));

function save(file, data){
  const p = path.join(dataDir, file);
  let arr = [];
  if(fs.existsSync(p)){
    try{ arr = JSON.parse(fs.readFileSync(p,"utf8")); }catch(e){}
  }
  arr.push({...data, createdAt:new Date().toISOString()});
  fs.writeFileSync(p, JSON.stringify(arr,null,2));
}

app.post("/api/bookings",(req,res)=>{
  save("bookings.json",req.body);
  res.json({success:true,message:"Booking saved"});
});

app.post("/api/enquiries",(req,res)=>{
  save("enquiries.json",req.body);
  res.json({success:true,message:"Enquiry saved"});
});

app.get("/api/health",(req,res)=>res.json({success:true,app:"Bindu Luxe Interiors"}));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));
});

app.listen(PORT,()=>console.log(`Bindu Luxe Interiors running at http://localhost:${PORT}`));
