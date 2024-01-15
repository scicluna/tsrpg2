interface Creature {
    name: string;
    hp: number;
    damage: number;
    defense: number;
    abilities: Ability[];
    weaknesses: DamageType[];
    resistances: DamageType[];
    statusEffects: StatusEffect[];
    sprite: string; //link from images folder
}

interface Monster extends Creature {
    loot: Item[];
    gold?: number;
    exp: number;
}

interface Hero extends Creature {
    level: number;
    xp: number;
    mana: number; 
    inventory: Item[];
    gold: number;
    location: WorldLocation;
    timeElapsed: number;
}