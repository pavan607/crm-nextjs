import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import type { RowDataPacket } from "mysql2";

interface Employee extends RowDataPacket {
  employee_id: number;
  employee_number: string;
  employee_first_name: string;
  employee_last_name: string;
  employee_email: string;
  employee_designation: string;
  department_name: string | null;
}

export async function GET() {
  try {
    const [result] = await pool.query<RowDataPacket[][]>(`CALL GetEmployees()`);

    const employees = result[0] as Employee[]; // The first result set (array of employees)

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
