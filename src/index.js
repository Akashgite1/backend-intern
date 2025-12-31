import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

// use function chaining to first connect Db and then start server 
connectDB()
    .then(() => {
        console.log("mongodb connected successfully");

        // listen to server port or 8000
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port :" ${process.env.PORT}`);
        });

    })
    .catch((err) => {
        console.log("mongodb connection failed", err);
    })


