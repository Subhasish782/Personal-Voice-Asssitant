import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import  genToken  from '../config/token.js';

export const signUp= async (req,res)=> {
    try {
        const {name,email,password}=req.body;
        const existEmail=await User.findOne({email})
        if(existEmail) {
            return res.status(400).json({message:"Email already exists"});
        }
        if(password.length < 6) {
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        const hashedPassword=await bcrypt.hash(password,10)

        const user=await User.create({
            name,email,password:hashedPassword
        })
        const token=await genToken(user._id)

        res.cookie("token",token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: true,
            sameSite: 'None'
        })

        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({message: `signup error ${error}`});
    }
}

export const logIn= async (req,res)=> {
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user) {
            return res.status(400).json({message:"Email doesn't exists"});
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch) {
            return res.status(400).json({message:"Incorrect password"});
        }
        const token=await genToken(user._id)

        res.cookie("token",token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: true,
            sameSite: 'None'
        })

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `login error ${error}`});
    }
}

export const logOut=async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        return res.status(500).json({message: `logout error ${error}`});
    }
}

