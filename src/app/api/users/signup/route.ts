
'use server'

import connect from '@/dbConfig/db_config'

import User from '@/models/userModel.js'

import { NextRequest, NextResponse } from 'next/server'

import bcryptjs from "bcryptjs"
import { Sedgwick_Ave_Display } from 'next/font/google'
import { hash } from 'crypto'

connect()


export async function POST(req: NextRequest) {


  try {

    const req_body = await req.json();

    const { username, email, password: pswd } = req_body;


    console.log("request being sent is ", req_body);


    const user = await User.findOne({ email })

    if (user) {

      return NextResponse.json({ error: "user already exist" }, { status: 400 });
    }


    let salt = bcryptjs.genSaltSync()


    let password = bcryptjs.hashSync(pswd, salt)





    if (password != null) {
      console.log(`FOOKING password is ${password}`);
      console.log("TYPE OF passoword is ", typeof password);

    }

    const new_user = new User({ 'username': username, 'email': email, 'password': password })



    const saved_user = await new_user.save()
    return NextResponse.json({ message: "user saved success", yikes: saved_user }, { status: 201 })

  } catch (error: any) {

    console.log(" SIGNUP ROUTE :aaya re aaya re error", error.message);
    return NextResponse.json({ message: " L lag gye request k " + error.message }, { status: 428 });

  }


}







