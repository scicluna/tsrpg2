interface Creature {
    name: string;
    health: number;
    damage: number;
    defense: number;
    abilities: Ability[];
    weaknesses?: DamageType[];
    resistances?: DamageType[];
    statusEffects?: StatusEffect[];
    sprite: string; //link from images folder
}

interface Monster extends Creature {
    loot: Item[];
}

interface Hero extends Creature {
    mana: number; 
    inventory: Item[];
    location: WorldLocation;
    timeElapsed: number;
}