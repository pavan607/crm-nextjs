// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "../../lib/db";
import { RowDataPacket } from 'mysql2';

interface Employee extends RowDataPacket {
  employee_id: number;
  employee_number: string;
  employee_email: string;
  employee_first_name: string;
  employee_last_name: string;
  employee_dob: string;
}

export async function POST(req: Request) {
  try {
    const { employee_number, employee_email, employee_dob } = await req.json();

    const [rows] = await pool.execute<Employee[]>(
      `SELECT employee_id, employee_number, employee_email, employee_first_name, employee_last_name, employee_dob 
       FROM crm_employee 
       WHERE employee_number = ? AND employee_email = ? AND employee_dob = ?`,
      [employee_number, employee_email, employee_dob]
    );

    if (rows.length > 0) {
      const employee = rows[0];
      
      // Set HTTP-only cookie for authentication
      (await cookies()).set("loggedIn", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 24 hours
      });

      // Return employee data to be stored in sessionStorage on client side
      return NextResponse.json({ 
        message: "Login successful",
        employee: {
          employee_id: employee.employee_id,
          employee_number: employee.employee_number,
          employee_email: employee.employee_email,
          employee_first_name: employee.employee_first_name,
          employee_last_name: employee.employee_last_name,
        }
      });
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}