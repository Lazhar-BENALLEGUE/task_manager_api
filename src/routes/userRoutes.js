
import express from "express"

import {getAllusers,getUsersById,addNewUser,updatById,deleteUser,loginUser,registerUser,logoutUser,logoutAllUser} from "../controllers/userController.js"
import auth from "../middleware/auth.js"
const router = new express.Router()

//CRUD
//C: Create -> POST
//R: Read => GET
//U: Update: PUT- PATCH
//D: Delete: DELETE
router.post("/users",addNewUser)
router.get("/users",auth,getAllusers)
router.get("/users/:id",auth,getUsersById)
router.put("/users/:id",updatById)
router.delete("/users/:id",deleteUser)
router.post("/users/login", loginUser)
router.post("/register", registerUser)
router.post("/users/logout",auth, logoutUser)
router.post("/users/logoutAll",auth,  logoutAllUser)

export default router