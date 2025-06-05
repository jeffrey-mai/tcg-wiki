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
  const { email, deck, action } = await req.json();

  if(action === "handleCreateDeck"){
    try {
      const { rows } = await pool.query(`SELECT decks FROM users WHERE email = $1`, [email]);
      const decks = rows[0].decks;
      let i = 1;
      if(decks.cardfight_vanguard["New Deck"]){
        while(decks.cardfight_vanguard[`New Deck ${i}`]) i++;
        decks.cardfight_vanguard[`New Deck ${i}`] = { "rideDeck": [], "list": [], "extraDeck": [] };
      } else {
        decks.cardfight_vanguard["New Deck"] = { "rideDeck": [], "list": [], "extraDeck": [] };
      }
      
      await pool.query(`UPDATE users SET decks = $1 WHERE email = $2`, [decks, email]);
      return NextResponse.json({
        deckList: await pool.query("SELECT decks FROM users WHERE email = $1", [email]),
        newDeck: !decks.cardfight_vanguard["New Deck 1"] ? "New Deck" : `New Deck ${i}`
      });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

  if(action === "handleSaveDeck"){
    try {
      const { rows } = await pool.query(`SELECT decks FROM users WHERE email = $1`, [email]);
      const decks = rows[0].decks;
      decks.cardfight_vanguard[deck.name] = { rideDeck: deck.info.rideDeck, list: deck.list, extraDeck: [] };
      
      await pool.query(`UPDATE users SET decks = $1 WHERE email = $2`, [decks, email]);
      return NextResponse.json({ message: 'Deck saved successfully' });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email, deckName } = await req.json();
    const { rows } = await pool.query(`SELECT decks FROM users WHERE email = $1`, [email]);
    const decks = rows[0].decks;
    delete decks.cardfight_vanguard[deckName];
    
    await pool.query(`UPDATE users SET decks = $1 WHERE email = $2`, [decks, email]);
    return NextResponse.json(await pool.query("SELECT decks FROM users WHERE email = $1", [email]));
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}