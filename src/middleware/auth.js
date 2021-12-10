import jwt from "jsonwebtoken"
import User from "../models/user.js"

const auth = async(req, res, next) => {

    try {

        console.log("--In auth: ", req)
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("token: ", token)
        const decoded = jwt.verify (token, "mysecret")
        console.log("decoded: ", decoded)

        const user = await User.findOne({_id: decoded._id, 'tokens.token': token}) 
        if (!user) {
            throw new Error()

        }
        req.token= token
        req.user = user

     next()
    } catch(err){
        console.log(`Error: ${err}`)

        res.status(401).json({
            message: "Not authorized: Please authenticate",
            data: {}
        })
    }
}
export default auth