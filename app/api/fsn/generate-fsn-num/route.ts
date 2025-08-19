// app/api/fsn/generate-fsn-num/route.ts
import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import { RowDataPacket } from 'mysql2';

interface FsnRow extends RowDataPacket {
  fsn_num: string;
}

export async function GET() {
  try {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');

    const [rows] = await db.execute<FsnRow[]>(`
      SELECT fsn_num FROM crm_fsn 
      WHERE fsn_num LIKE 'FSN${year}${month}%' 
      ORDER BY fsn_num DESC 
      LIMIT 1
    `);

    let nextNumber = 1;
    if (rows.length > 0) {
      const lastFsnNo = rows[0].fsn_num;
      const lastNumber = parseInt(lastFsnNo.slice(-4));
      nextNumber = lastNumber + 1;
    }

    const fsnNum = `FSN${year}${month}${String(nextNumber).padStart(4, '0')}`;

    return NextResponse.json({ fsn_num: fsnNum });
  } catch (error) {
    console.error('Error generating FSN number:', error);
    return new NextResponse('Failed to generate FSN number', { status: 500 });
  }
}