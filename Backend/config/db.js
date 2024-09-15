const mongoose=require("mongoose");

const connectDB= async ()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB is connected `);
        
    } catch (error) {
        console.log(`error ${error}`);
        process.exit(1);
    }
}

module.exports=connectDB;