import express from 'express';
import cors from 'cors';
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("API is running");
})

app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);

export default app;