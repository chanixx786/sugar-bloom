import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import {cookies} from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try{

        const {email, password} = await request.json();
        
        console.log("Login request received:", {email, password});
        if (!email || !password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        const account = await prisma.account.findUnique({
            where: {acc_email: email},
            select: {
                acc_id: true,
                acc_email: true,
                acc_fname: true,
                acc_lname: true,
                acc_password: true,
                acc_type: true,
            }
        });

        // Check if user exists
        if (!account){
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            )
        }

        // Create JWT Token
        // const token = jwt.sign(
        //     {
        //         acc_id: account.acc_id,
        //         acc_email: account.acc_email,
        //     }
        // )

        // Set Cookie
        // cookies().set('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 7 * 24 * 60 * 60, // 7 days
        //     path: '/',
        // });

        return NextResponse.json({
            success: true,
            message: 'Login successful',
        })

    } catch(error){
        console.error("Login error:", error);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        )
    }
}