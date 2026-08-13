import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path'




const app = express();

app.use(cors({
    origin : "*",
    methods : ["GET" , "POST", "DELETE" , "PUT"],
    allowedHeaders : ["Content-Type", "Authorization"]
}));

app.use('/uploads' , express.static(path.join(__dirname,'uploads'), {}))

app.get("/", (req, res) => {res.send("Server is live!");});



const PORT = process.env.PORT || 5000 ;

app.listen(PORT , ()=> console.log(`Server running on port ${PORT}`))