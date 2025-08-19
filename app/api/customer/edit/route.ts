import { NextResponse } from "next/server";
import pool from "../../../lib/db";
import type { RowDataPacket, FieldPacket, OkPacket } from "mysql2";

type Customer = {
  customer_id: number;
  customer_name: string;
  customer_short_name: string;
  customer_contact_person: string;
  customer_address: string;
  customer_mail_id: string;
  customer_contact_number: string;
  customer_gst_num: string;
  customer_country: string;
  customer_active: number;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ customer_id: string }> }
) {
  const { customer_id } = await params;

  try {
    const [rows]: [Customer[] & RowDataPacket[], FieldPacket[]] = await pool.query(
      "CALL GetCustomerById(?)",
      [customer_id]
    );

    const customerData = rows[0]?.[0];

    if (!customerData) {
      return NextResponse.json({ message: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json({ customer: customerData });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ customer_id: string }> }
) {
  const { customer_id } = await params;

  try {
    const body = await req.json();

    const {
      customer_name,
      customer_contact_person,
      customer_address,
      customer_mail_id,
      customer_contact_number,
      customer_gst_num,
      customer_country,
      customer_active,
    } = body;

    const [result]: [OkPacket, FieldPacket[]] = await pool.query(
      "CALL UpdateCustomerById(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        customer_id,
        customer_name,
        customer_contact_person,
        customer_address,
        customer_mail_id,
        customer_contact_number,
        customer_gst_num,
        customer_country,
        customer_active,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "No customer updated" }, { status: 404 });
    }

    return NextResponse.json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ customer_id: string }> }
) {
  const { customer_id } = await params;

  try {
    const [result]: [OkPacket, FieldPacket[]] = await pool.query(
      "CALL DeleteCustomerById(?)",
      [customer_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "No customer deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
