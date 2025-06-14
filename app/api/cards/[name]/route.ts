import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM cardfight_vanguard WHERE name ILIKE '%' || $1 || '%'",
      [name]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 });
  }
}
