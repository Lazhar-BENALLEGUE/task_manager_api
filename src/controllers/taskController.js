
import Task from "../models/task.js"

const getAllTasks = async (req, res) => {

    try {
        const tasks = await Task.find()
        console.log("tasks: ",tasks)
    
        res.status(200).json({
            message :"tasks found successfully",
            data : tasks
        })
    
    }catch(error) {
        console.log(`Error :${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error :error
    
        })
    }
    
    }

const getCompletedTasks = async (req ,res) => {
    console.log("req.query: ", req.query)
    const completed = req.query.completed
    console.log("completed: ", completed)
    try {
        const tasks = await Task.find({completed: completed}).populate("owner", "name email")
        console.log("tasks: ", tasks)
        res.status(200).json({
            message: "Task found successfully",
            data: tasks
        })

    } catch(e) {
        console.log(`Error: ${e}`)
        //send error response to client
        res.status(500).json({
            message: "Internal server error",
            error: e
        })
    }


}

const addNewTask = async (req ,res) => {
console.log("request body: ", req.body)
    const task = new Task(req.body)
    try {
        //save user in database
        await task.save()
        //send success response to client
        res.status(201).json({
              message: "Task created successfully",
              data: task
          })

    }catch(error){
      console.log(`Error: ${error}`)
      //send error response to client
      res.status(500).json({
          message: "Internal server error",
          error: error
      })
    }

}

const getTaskById = async (req ,res) => {
    console.log("req: ", req)
    const id = req.params.id
    if(!id) {
        response.status(400).json({
            message: "Bad request"
        })
    }
    try {
        const task = await Task.findById(id)
        if(!task) {
            response.status(404).json({
                message: "Task not found"
        })
        }
        res.status(200).json({
            message: "Task found successfully",
            data: task
        })

    } catch(error) {
        console.log(`Error: ${error}`)
        //send error response to client
        response.status(500).json({
            message: "Internal server error",
            error: error
        })
    }


}

export  {
    getAllTasks,getCompletedTasks,addNewTask,getTaskById
}