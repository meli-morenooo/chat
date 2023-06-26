const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;

    return jwt.sign({_id}, jwtkey, { expiresIn: "3d" });
};

const resgisterUser = async (req, res) => {

    try{
        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (user)
            return res.status(400).json("El usuario con el correo electrónico proporcionado ya existe...");

        if (!name || !email || !password)
            return res.status(400),json("Todos los campos son obligatorios...");

        if (!validator.isEmail(email))
            return res.status(400).json("El correo electrónico debe ser un correo electrónico válido...");

        if (!validator.isStrongPassword(password))
            return res.status(400).json("La constraseña debe ser segura...");

            user = new userModel({name, email, password});

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            await user.save()

            const token = createToken(user._id);

            res.status(200).json({_id: user._id, name, email, token});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
}
};

module.exports = { resgisterUser };