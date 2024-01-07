import { Outcome } from "./optionoutcome";

export type ItemType = "consumable" | "equipment";
export type ConsumableType = "healing" | "mana" | "buff" | "debuff";
export type EquipmentType = "weapon" | "chest" | "legs" | "head" | "cloak" | "accessory" | "gloves" | "boots";
export const VALID_ITEM_TYPES: ItemType[] = ["consumable", "equipment"];
export const VALID_CONSUMABLE_TYPES: ConsumableType[] = ["healing", "mana", "buff", "debuff"];
export const VALID_EQUIPMENT_TYPES: EquipmentType[] = ["weapon", "chest", "legs", "head", "cloak", "accessory", "gloves", "boots"];


export interface Item {
    id: string;
    name: string;
    description: string;
    itemType: ItemType;
    price: number;
}

////////////////////////

export interface Consumable extends Item {
    consumableType: ConsumableType;
    effects: Outcome[];
    self?: boolean;
    aoe?: boolean;
}

///////////////////////////

export interface Equipment extends Item {
    equipmentType: EquipmentType;
    statBoosts: StatChange;
}


export const VALID_STAT_CHANGE_KEYS: Array<keyof StatChange> = [
    'hp', 
    'mp', 
    'dmg', 
    'def'];

export interface StatChange {
    hp?: number;
    mp?: number;
    dmg?: number;
    def?: number;
}

