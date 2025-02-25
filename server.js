const express = require('express')
const mongoose = require('mongoose')
const Restaurent = require('./model/RestuarentModel')
const mongo = process.env.mongoURL
const PORT = process.env.PORT || 5001
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(express.json())

mongoose.connect(mongo)
.then(()=>{
    console.log("Sucessfully Connected to MongoDB")
}).catch((error)=>{
    console.error(error)
   
})

app.post("/create",async(req,res)=>{
    try {
    
        const newModel = new Restaurent(req.body)
        const savedModel = await newModel.save()
        res.status(200).json(savedModel)

        
    } catch (error) {
        res.status(400).json({"message":"Validation failed"})
        
    }

})

app.get("/restaurent",async(req,res)=>{
    try {
        const model = await Restaurent.find()
        res.status(200).json(model)
        
    } catch (error) {
        console.log(error)  
    }
  
})

app.get("/restaurent/:id",async(req,res)=>{
    const id =req.params.id
    try {
        const ModelId = Restaurent.findById(id)
        if(!ModelId){
            return res.status(404).json({"message":"Restaurent not found"})
        }
        res.status(200).json(ModelId)

        
    } catch (error) {
        console.log(error)
        
    }
})

app.put("restaurent/:id",async(req,res)=>{
    const id = req.params.id
    try {
        const UpdatedModel = Restaurent.findByIdAndUpdate(id,req.body)
        if(!UpdatedModel){
            return res.status(404).json({"message":"Restaurent not found"})
        }
        res.status(200).json(UpdatedModel)
    } catch (error) {
        console.log(error)

        
    }
})

app.delete("restaurent/:id",async(req,res)=>{
    try {
        const deletedModel = await Restaurent.findByIdAndDelete(req.params.id)
        if(!deletedModel) return res.status(404).json({message:'restaurenr not found'});
        res.status(200).json({message:'Restaurent deleted successfully'})

    } catch (error) {
        res.status(500).json({"error":"Something went wrong"})

        
    }
})



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
