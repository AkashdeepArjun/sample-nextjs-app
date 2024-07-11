import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {



  try {

    const req_body = await request.json();

    const { token } = req_body;

    const o_user = await User.findOne({ forgotPasswordToken: token, forgotPasswordExpiryToken: { $gt: Date.now() } })

    if (!o_user) {

      return NextResponse.json({ error: "NO SUCH USER FOUND " }, { status: 404 })

    } else {

      console.log("USER FOUND YAY ", o_user);

      return NextResponse.json({ message: "oh my gawd success", data: o_user }, { status: 200 })



    }






  } catch (error: any) {


    console.log("ERROR AT VALIDATE RECOVERY LINK", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 })
  }




}
