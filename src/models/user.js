//create User model: 
//name required 
//email : must to be: required, lowercase, unique and validated by validator
//password must be required, with minlength of 7 and validated
//age
import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true /* "     hello   " => "hello" */
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


}, {
    timestamps: true
})

//Hash the plain text password before saving
userSchema.pre('save', async function (next){
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//find a user by email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login: email does not exit')
    }
    //check password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login: password does not match')
    }
    return user
}

//function to generate a token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    //create a token using id of user and a key secret: "mysecret"
    const token = jwt.sign({_id: user._id.toString()}, "mysecret")

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}


const User = mongoose.model("User", userSchema)

export default User
