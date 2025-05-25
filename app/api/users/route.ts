import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(req: NextRequest) {
  try {
    const { currentDeck, newDeckName, email } = await req.json();
    const { rows } = await pool.query(`SELECT decks FROM users WHERE email = $1`, [email]);
    const decks = rows[0].decks;
    const deckData = decks.cardfight_vanguard?.[currentDeck];

    delete decks.cardfight_vanguard[currentDeck];
    decks.cardfight_vanguard[newDeckName] = deckData;
    
    await pool.query(`UPDATE users SET decks = $1 WHERE email = $2`, [decks, email]);
    return NextResponse.json({ message: 'Deck name updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}