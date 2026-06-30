import { NextResponse } from "next/server";

export async function POST(request){
    try {

    } catch(error){
        return NextResponse.json(
            {e: "Internal server error"},
            {status: 500}
        )
    }
}