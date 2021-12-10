
import User from "../models/user.js"

const addNewUser = async (request,response) => {
    console.log("request: ", request.body)

    const user = new User(request.body) 
    try {
        //save user in data base
        await user.save()
        //send success response to clent
        response.status(200).json({
            message: "User created",
            data: user    
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

const getAllusers = async (req, res) => {

try {
    const users = await User.find()
    console.log("users: ",users)

    res.status(200).json({
        message :"Users found successfully",
        data : users
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

const getUsersById = async (req, res) => {
    console.log ("req: ", req)
    const id = req.params.id
    if(!id) {
        res.status(400).json({
            message :"bad request"
        })
    }

    try {
        const user = await User.findById(id)
        console.log("user: ",user)
        if(!user) {
            res.status(404).json({
                message: "user not found"})
        }
       
        console.log("users: ",user)
    
        res.status(200).json({
            message :"User found successfully",
            data : user
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

const updatById = async (req, res) => {
        console.log ("req: ", req)
        const id = req.params.id
        if(!id) {
            res.status(400).json({
                message :"bad request"
            })
        }
    
        try {
            const user = await User.findById(id)
            console.log("user: ",user)
            if(!user) {
                res.status(404).json({
                    message: "user not found"})
            }

            await User.updateOne({_id:id},
                {$set :{email:"newlazhar@gmail.dz"}})
        
            res.status(200).json({
                message :"User found successfully",
                data : user
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
const deleteUser = async (req, res) => {
            console.log ("req: ", req)
            const id = req.params.id
            if(!id) {
                res.status(400).json({
                    message :"bad request"
                })
            }
        
            try {
                const user = await User.findById(id)
                console.log("user: ",user)
                if(!user) {
                    res.status(404).json({
                        message: "user not found"})
                }
    
                await User.deleteOne({_id:id})
            
                res.status(200).json({
                    message :"User deleted successfully",
                    data : {}
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

    const loginUser = async(req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findByCredentials(email, password)
            if(!user) {
                res.status(404).json({
                    message: "User does not exist",
                    data: {}
                })
            }
            const token = await user.generateAuthToken()
            res.status(200).json({
                message: "Logged successfully",
                data: {user, token}
            })
    
        } catch(error){
            console.log(`Error: ${error}`)
            //send error response to client
            res.status(500).json({
                message: "Internal server error",
                data: {}
            })
        }
       
    }

const registerUser = async(req, res) => {
        try {
            const {name, email, password} = req.body
    
            if(!(name && email && password)) {
                return res.status(400).json({
                    message: "All inputs are required"
                })
            }
            const oldUser = await User.findOne({email})
            console.log("-----OldUser is: ", oldUser)
            if(oldUser) {
                return res.status(409).json({
                    message: "User already exist. Please Login"
                })
            }
            //create a user
            const user = new User(req.body)
    
            // add token 
            const token = await user.generateAuthToken()
            console.log("token: ", token)
    
            res.status(201).json({
                message: "User created successfully",
                data: {
                    user,
                    token
                }
            })
        }catch(e){
            console.log(`Error: ${e}`)
            //send error response to client
            res.status(500).json({
                message: "Internal server error",
                error: e
            })
          }
}

const logoutUser= async (req, res)=> {
     
    try {
        req.user.tokens = req.user.tokens.filter(elem => {
            return elem.token != req.token
        })
        await req.user.save()
        res.status(200).json({
            message : "User logout successfully",
            data: req.user
        })
        }catch(e) {
        console.log(`Error: ${e}`)

        res.status(500).json({
            message: "internal server error",
            data : e
        })
    }

}

const logoutAllUser= async (req, res)=> {
    try {
        //delete all tokenof user
        req.user.tokens = []
        await req.user.save()
        res.status(200).json({
            message : "User logout from All devices successfully",
            data: req.user
        })
        }catch(e) {
        console.log(`Error: ${e}`)

        res.status(500).json({
            message: "internal server error",
            data : e
        })
    }
    
}
            

export  {
    addNewUser,getAllusers,getUsersById,updatById,deleteUser,loginUser,registerUser,logoutAllUser,logoutUser
}