import express from 'express';
import userRoutes from "./routes/user.route.js"
import dotenv from "dotenv"
import cors from 'cors'
import path from "path"

dotenv.config();

const app  = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

console.log(__dirname);

app.use('/api', userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


app.listen(PORT,()=>{
    console.log('server started at port 5000')
})