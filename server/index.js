import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import compress from 'compression'
import helmet from 'helmet'
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(helmet())
app.use(cors())
app.use(cors())
app.use(compress())

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server runnning on port: ${PORT}`))})
    .catch((error) => console.log(`${error} did not connect`))


app.use('/', (req, res)=>{
    res.status(200).send('Hello!')
})

