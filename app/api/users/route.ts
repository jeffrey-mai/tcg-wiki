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

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const { rows } = await pool.query(`SELECT decks FROM users WHERE email = $1`, [email]);
    const decks = rows[0].decks;
    if(decks.cardfight_vanguard["New Deck"]){
      let i = 1;
      while(decks.cardfight_vanguard[`New Deck ${i}`]) i++;
      decks.cardfight_vanguard[`New Deck ${i}`] = [];
    } else {
      decks.cardfight_vanguard["New Deck"] = [];
    }
    
    await pool.query(`UPDATE users SET decks = $1 WHERE email = $2`, [decks, email]);
    return NextResponse.json({ message: 'New deck created successfully' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email, deckName } = await req.json();
    const { rows } = await pool.query(`SELECT decks FROM users WHERE email = $1`, [email]);
    const decks = rows[0].decks;
    delete decks.cardfight_vanguard[deckName];
    
    await pool.query(`UPDATE users SET decks = $1 WHERE email = $2`, [decks, email]);
    return NextResponse.json({ message: 'Deck deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}