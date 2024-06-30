"use server"

import { resolve6 } from "dns/promises";
import { NextResponse } from "next/server";



export async function GET() {


  try {

    const response = NextResponse.json(({ message: "logout Sucess!!!!", success: true }))

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

    return response;


  } catch (error: any) {

    console.log("LOGOUT ROUTE ERROR", error.message);

    return NextResponse.json({ error: error.message }, { status: 500 })

  }







}
