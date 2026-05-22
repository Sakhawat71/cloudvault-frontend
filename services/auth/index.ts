/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const result = await res.json();
        return result;
    } catch (error: any) {
        return Error(error);
    }
};


export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const result = await res.json();

        if (result.success) {
            (await cookies()).set("token", result.token);
        }

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("token")?.value;
    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        return decodedData;
    } else {
        return null;
    }
};


export const logoutUser = async () => {
    try {
        (await cookies()).delete('token');
    } catch (err: any) {
        return Error(err);
    }
};

export const getMe = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/me`,
            {
                credentials: "include",
                cache: "no-store",
            }
        );

        return await res.json();
    } catch (error) {
        console.log(error);
    }
};