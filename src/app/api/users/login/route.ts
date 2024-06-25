
"use server"

import connect from '@/dbConfig/db_config'

import User from '@/models/userModel.js'

import { NextRequest, NextResponse } from 'next/server'

import bcryptjs from "bcryptjs"

import jwt from "jsonwebtoken"

connect()
export async function POST(req: NextRequest) {


  try {

    const req_body = await req.json()
    const { email, password: pswd } = req_body;
    console.log("BODY RECIEVED ", req_body);
    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: "user does not exist" }, { status: 400 })
    }


    //compare password

    const valid_password = bcryptjs.compareSync(pswd, user.password)

    if (!valid_password) {
      console.log('INVALID PASSWORD PLEASE DO SOMETHING ABOUT IT')
      return NextResponse.json({ error: "please enter valid password" }, { status: 404 })
    }


    //CREATE TOKEN DATA TO VERIFY User


    const tokenData = {

      id: user._id,
      email: user.email,
      username: user.username

    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: "1d" })

    const response = NextResponse.json({ message: "Login Success!!", success: true })

    response.cookies.set("token", token, { httpOnly: true })

    return response;

  } catch (error: any) {

    console.log("ROUTE LOGIN PAR ERROR AA GAYA", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 })



  }

}
