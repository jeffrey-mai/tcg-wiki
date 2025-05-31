export interface Cards {
  name: string;
  type: string;
  nation: string;
  race: string;
  grade: number;
  power: number;
  critical: number;
  shield: number;
  effect: string;
  quote: string;
  version: string;
  card_code: string;
  rarity: string[];
  image_url: string[];
}

export interface DeckInfo {
  version: string;
  nation: string;
  total_cards: number;
  grade_4: number;
  grade_3: number;
  grade_2: number;
  grade_1: number;
  grade_0: number;
  rideDeck: Cards[]
  dupes: { [key: string]: number }
}