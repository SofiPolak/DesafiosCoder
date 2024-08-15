import { Router } from "express";
import nodemailer from "nodemailer";
import { createHash } from "../../utils.js";
import userService from '../../dao/models/users.model.js'
import bcrypt from 'bcryptjs';
const router = Router();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "sofiadanielapolak@gmail.com",
        pass: "anwz yeiy dana cvso"
    },
});

router.get('/mailPass', async (req, res) => {

    await transport.sendMail(
        {
            from: "sofiadanielapolak@gmail.com",
            to: "sofi_polak@hotmail.com",
            subject: "Restablecer contraseña",
            html: `<div>
                <h2>Para restablecer su contraseña haga click en el boton.</h2>
                <a href="http://localhost:8080/changePass">Restablecer contraseña</a>
                </div>`
        }
    )
    res.send("Se le ha enviado un mail para restablecer la contraseña")
})

router.post('/changePass', async (req, res) => {

    const { email, newPassword } = req.body;
    let user = await userService.findOne({ email: email })

    if (!user) {
        res.send({ message: "El usuario no existe" })
        return
    }

    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSame) {
        res.send({ message: 'La nueva contraseña no puede ser la misma que la antigua' });
        return
    }

    user.password = createHash(newPassword);
    await user.save();
    res.redirect('/login');
});

router.put('/admin/:uid', async (req, res) => {
    let { uid } = req.params
    let { role } = req.body
    const result = await userService.updateOne({ _id: uid }, { role: role })
    res.send({ result: "success", payload: result });
})

export default router;