import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server"

import User from "@/models/userModel";

import bcryptjs from "bcryptjs";


export async function POST(request: NextRequest) {



  try {
    const req_body = await request.json();

    console.log(" SERVER SIDE :ROUTE UPDATE USER REQUEST RECIEVED BODY:", req_body);

    const { username, uname, upass } = req_body;

    const user = await User.findOne({ username })

    if (!user) {
      return NextResponse.json({ error: "no such user exist" }, { status: 404 })

    } else {
      user.username = uname;


      let salt = bcryptjs.genSaltSync()


      let new_password = bcryptjs.hashSync(upass, salt);

      user.password = new_password;

      await user.save()

      return NextResponse.json({ message: "user updated successfully" }, { status: 200 })


    }

  } catch (error: any) {

    return NextResponse.json({ error: error.message }, { status: 500 })

  }






}
