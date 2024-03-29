import { Ability, DamageType } from "./ability";
import { Equipment, Item } from "./items";
import { WorldLocation } from "./location";
import { StatusEffect } from "./status";

export interface Creature {
    name: string;
    hp: number;
    maxHp: number;
    damage: number;
    defense: number;
    abilities: Ability[];
    weaknesses: Record<DamageType, string | number>[];
    resistances: Record<DamageType, string | number>[];
    statusEffects: StatusEffect[];
    sprite: string; //link from images folder
}

export interface Monster extends Creature {
    loot: Item[];
    gold?: number;
    exp: number;
}

export interface Hero extends Creature {
    level: number;
    xp: number;
    maxMp: number;
    mp: number; 
    inventory: Item[];
    gold: number;
    location: WorldLocation;
    timeElapsed: number;
    equipped: {
        weapon: Equipment | null;
        armor: Equipment | null;
        accessory: Equipment | null;
    }
}