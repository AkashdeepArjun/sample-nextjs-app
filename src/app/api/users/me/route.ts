import { NextRequest, NextResponse } from "next/server";

import { ExtractUserToken } from "@/helpers/ExtractToken";

import User from "@/models/userModel";
import connect from "@/dbConfig/db_config";




connect()


export async function GET(request: NextRequest) {





  try {

    const user_id = await ExtractUserToken(request);


    const user = await User.findOne({ _id: user_id }).select("-password -isAdmin")


    return NextResponse.json({ message: "user found success", data: user })
  } catch (error: any) {

    return NextResponse.json({ error: error.message }, { status: 400 })

  }




}
