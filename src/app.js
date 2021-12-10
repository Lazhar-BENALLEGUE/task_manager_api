import express from "express"
import "./db/mongoose.js"

import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)


export default app