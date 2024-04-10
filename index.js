require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
app.use(express.json());
app.use(cors());
const calculate=(weightKg, heightCm)=>{
    // Convert height from centimeters to meters
    var heightM = heightCm / 100;

    // Calculate BMI
    var bmi = weightKg / (heightM * heightM);

    return(bmi.toFixed(2));
}
const verdict=(bmi)=>{
    // console.log(typeof(bmi));
    if (bmi < 18.5) {
        return "You are Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "You are Normal weight";
    } else {
        return "You are Overweight";
    }
}
app.get('/calculate', (req, res) => {
    const {weight,height}=req.query;
    console.log(weight,height,req.query);
    if(height==0 || weight==0 ||height==undefined||weight==undefined){
        return res.json({
            bmi:"",
            text:"Enter valid parameter"
        })
    }
    const bmi=calculate(weight,height);
    const text=verdict(bmi);
    res.json({
        bmi,
        text
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})