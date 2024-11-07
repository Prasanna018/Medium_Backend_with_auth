import UserDb from '../Models/User-model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const Signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserDb.findOne({ email });
    if (user) {
        return res.status(400).json({
            message: "email is already used"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserDb({
        username,
        email,
        password: hashedPassword
    })

    await newUser.save()

    if (newUser) {
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECREATE, { expiresIn: "10 days" })
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        }).status(200).json({
            user: {
                username: newUser.username,
                email: newUser.email,
                password: newUser.password



            },
            message: "User Created Successfully"
        })
    }

}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserDb.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })

    }
    const comparePassword = user.password;
    const isValid = await bcrypt.compare(password, comparePassword);
    if (!isValid) {
        return res.status(400).json({
            message: "Password do not match"
        })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECREATE, { expiresIn: "10 days" })
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    }).status(200).json({
        message: "Log in successfully",
        user: {
            username: user.username,
            email: user.email,
            password: user.password

        }
    })


}

export const LogOut = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        message: "Log out successfull"
    })

}
