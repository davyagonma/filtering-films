import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as EmailValidator from 'email-validator';
import { config, from } from "@/utils/constants";
import { environmentUrl } from "@/utils/url";
const nodemailer = require('nodemailer');

const generateCode = () => Math.floor(Math.random() * 90000) + 10000;

// User Register
export async function POST(req: Request) {
    try {
        const { nom, prenom, contact, email, password } = await req.json();
        if (!nom || !prenom || !contact || !email || !password) {
            return NextResponse.json({ user: null, success: false, message: "All fields are required" }, { status: 400 });
        }
        if (!EmailValidator.validate(email)) {
            return NextResponse.json({ user: null, success: false, message: "Invalid email. Use a valid email. Ex: abc@xyz.com" }, { status: 400 });
        }
        const existingUserByEmail = await db.user.findUnique({ where: { email } });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, success: false, message: "User with this email already exists" }, { status: 409 });
        }
        const hashedPassword = await hash(password, 10);
        const code = generateCode();
        const transporter = nodemailer.createTransport({...config});
        const mailData = {
            from: from,
            to: email,
            subject: "Vérification email",
            text: 'Ce mail provient de Espace-Show-plus',
            html: `Ceci est votre OTP de vérification de votre adresse email: ${code}. <br/> Vous pouvez aussi accéder à la page de véfication en cliquant sur le lien suivant: <br/><br/> ${environmentUrl()}/verification?email=${email}&otp=${code}`
        };
        await transporter.sendMail(mailData, (err: any, info: any) => {
            if (err) {
                db.user.delete({ where: { email } });
                return NextResponse.json({ user: null, success: false, message: "User created failed. Try again" }, { status: 500 });
            }
        });
        //  implementer ici la notification pour la formation sur l'utilisation de la plateforme
        await db.user.create({
            data: { nom, prenom, contact, email, password: hashedPassword, verificationCode: `${code}`}
        });
        return await NextResponse.json({ otp: code, success: true, message: "User created successfully, We are sending an OTP to your email address" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", success: false }, { status: 500 });
    }
}

