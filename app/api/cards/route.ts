import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM cardfight_vanguard');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching cards:', error);
    return new NextResponse('Failed to fetch cards', { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   const { name, email } = await req.json();
//   const { rows } = await pool.query(
//     'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
//     [name, email]
//   );
//   return NextResponse.json(rows[0], { status: 201 });
// }
