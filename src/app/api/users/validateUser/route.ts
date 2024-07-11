import connect from "@/dbConfig/db_config";

import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";

import sendEmail from '@/helpers/mailer'



connect()


export async function POST(request: NextRequest) {



  try {

    const req_body = await request.json();

    console.log('REQUEST FOUND IS ', req_body);

    const { email } = req_body;

    const existing_user = await User.findOne({ email })

    if (!existing_user) {

      return NextResponse.json({ error: "no such user exist" }, { status: 404 })

    } else {


      console.log("EXISTING USER FOUND", existing_user);
      console.log("\n sending mail ...... \n");

      const mail_res = await sendEmail({ email, emailType: 'RESET', userId: existing_user._id })

      return NextResponse.json({ message: "congratulations user is verified!!" }, { status: 200 })
    }


  } catch (error: any) {

    console.log('VALIDATE USER ROUTE ERROR', error.message);

    return NextResponse.json({ error: error.message }, { status: 503 })

  }









}
