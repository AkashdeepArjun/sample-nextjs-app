import connect from "@/dbConfig/db_config";
import { verify } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import User from "@/models/userModel";

connect()


export async function POST(request: NextRequest) {



  try {

    const req_body = await request.json();

    const { token } = req_body;


    console.log("ROUTE VERIFY MAIL :TOKEN IS ", token);



    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })


    if (!user) {


      console.log("I SUSPECT VERIFICATION TOKEN IS EXPIRED");
      return NextResponse.json({ error: "invalid token" }, { status: 400 })
    }



    user.isVerified = true;

    let current_time = Date.now();


    if (user.verifyTokenExpiry < current_time) {

      console.log(' TOKEN EXPIRED LOL')
      user.verifyToken = undefined;

      user.verifyTokenExpiry = undefined;




    }


    await user.save();


    return NextResponse.json({ message: "Email verified!!" }, { status: 200 })


  } catch (error: any) {

    return NextResponse.json({ error: error.message }, { status: 500 })

  }







}

