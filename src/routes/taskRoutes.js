import express from "express"

import {getAllTasks,getCompletedTasks,addNewTask,getTaskById} from "../controllers/taskController.js"

const router = new express.Router()

//CRUD
//C: Create -> POST
//R: Read => GET
//U: Update: PUT- PATCH
//D: Delete: DELETE

router.get("/tasks",getAllTasks)
router.post("/tasks",addNewTask)
router.get("/tasks/:id", getTaskById)
router.get("/tasks",getCompletedTasks)


export default router