import prisma from '@lib/prisma';
import { NextResponse } from 'next/server';
import {cookies} from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try{

        const {email, password} = await request.json();

        if (!email || !password){
            return NextResponse.json(
                {error: "Email and password are required"},
                {status: 400}
            )
        }

        const user = await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                email: true,
                name: true,
                password: true, 
                role: true,
                isVerified: true
            }
        });

        // Check if user exists
        if (!user){
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            )
        }

        // Create JWT Token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            }
        )

        // Set Cookie
        cookies().set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
        });

        return NextResponse.json({
            success: true,
            message: 'Login successful',
        })

    } catch(error){
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        )
    }
}