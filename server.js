const express=require("express");
const cors=require("cors");
const fs = require("fs");
const path = require('path');
const app=express();
const port=3000;

app.use(cors());

function getsensordata(){
    return {
        lim_temperature: Math.random() *30 +50,
        acceleration:Math.random() *50+30,
        voltage: Math.random() *40+30,
        high_battery_temp:Math.random() *40+30,
        high_battery_voltage:Math.random() *40+30,
        high_battery_power:Math.random() *40+30,
        high_battery_current:Math.random() *40+30,
        low_battery_temp:Math.random() *40+30,
        low_battery_voltage:Math.random() *40+30,
        low_battery_power:Math.random() *40+30,
        low_battery_current:Math.random() *40+30,
        proximity:Math.random() *40+30,
        gap_height:Math.random() *40+30,
        pressure:Math.random() *40+30,
    };
}

app.get("/",(req,res)=>{
    const sensordata=getsensordata();
    // const filePath = path.join(__dirname, 'sensordata.json');
    // fs.appendFileSync(filePath, JSON.stringify(sensordata, null, 2));
    res.json(sensordata);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});