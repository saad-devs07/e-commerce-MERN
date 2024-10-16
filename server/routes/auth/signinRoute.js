import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/userModel.js';

const router = express.Router();

router.post('/api/signin', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({error: "User not found!"})
        }

        const isPasswordMatch = await bcrypt.compare(password.toString(), user.hashedPassword);
        if(!isPasswordMatch){
            return res.status(400).json({error: "Password not matched!"})
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.fullName,
                email: user.email,
                role: user.role,
                image: user.ImageName
            },
            process.env.JWT_SECRET,
            {expiresIn: '3h'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'   
        })

        return res.status(200).json({
            message: "Login Successfull!",
            token,
            id: user._id,
            name: user.fullName,
            email: user.email,
            role: user.role,
            image: user.ImageName
        });

    } catch (error) {
        console.log("Error during login: ", error);
        return res.status(500).json({error: "Internal server error!"});
    }
});

export default router;
