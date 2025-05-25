import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: Promise<{ email: string }> }) {
  const { email } = await params;
  
  try {
    const { rows } = await pool.query(
      "SELECT decks FROM users WHERE email = $1",
      [email]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: `Database error: ${error}` }, { status: 500 });
  }
}
