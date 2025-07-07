'use server';

import { redirect } from "next/navigation";

interface UserCreateType {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface UserLoginType {
  email: string;
  password: string;
}

// Create User (Signup)
export async function createUser(prevState: unknown, formData: FormData) {
  const userSignUp: UserCreateType = {
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirm_password: formData.get("confirm_password")?.toString() || "",
  };

  try {
    const res = await fetch("https://car-nextjs-api.cheatdev.online/api/v1/auths/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSignUp),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { message: errorData.message || "Failed to register user" };
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    return { message: "Something went wrong during signup" };
  }
}

// Login User
export async function UserLogin(prevState: unknown, formData: FormData) {
  const userLogin: UserLoginType = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  try {
    const res = await fetch("https://car-nextjs-api.cheatdev.online/api/v1/auths/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLogin),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { message: errorData.message || "Failed to login" };
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return { message: "Something went wrong during login" };
  }
}
