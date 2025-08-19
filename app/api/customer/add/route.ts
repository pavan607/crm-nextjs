import { NextResponse } from "next/server";
import pool from "../../../lib/db"; // assuming this exports mysql.createPool({...})

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      customer_name,
      customer_short_name,
      customer_contact_person,
      customer_address,
      customer_mail_id,
      customer_contact_number,
      customer_gst_num,
      customer_country,
      customer_active,
    } = data;

    if (!customer_name || !customer_mail_id || !customer_contact_number) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const query = `CALL InsertCustomer(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      customer_name,
      customer_short_name,
      customer_contact_person,
      customer_address,
      customer_mail_id,
      customer_contact_number,
      customer_gst_num,
      customer_country,
      Number(customer_active),
    ];

    await pool.execute(query, values);

    return NextResponse.json({ message: "Customer registered successfully" });
  } catch (error) {
    console.error("Customer registration error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
