import { NextResponse } from "next/server";
import pool from "../../../lib/db"; // Adjust path based on your project structure

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM crm_customer");
    return NextResponse.json({ customers: rows });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
