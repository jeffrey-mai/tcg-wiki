export interface DeckBuildID {
  params: { id: string };
}

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