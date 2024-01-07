export enum ItemType  {
    Consumable,
    Equipment
}

export interface Item {
    id: string;
    name: string;
    description: string;
    itemType: ItemType;
    price: number;
}

////////////////////////

export enum ConsumableType {
    Healing,
    Mana,
    Buff,
    Debuff
}

export interface Consumable extends Item {
    consumableType: ConsumableType;
    effects: Outcome[];
    self?: boolean;
    aoe?: boolean;
}

///////////////////////////

export enum EquipmentType {
    Weapon, 
    Chest,
    Legs,
    Head,
    Cloak,
    Accessory,
    Gloves,
    Boots
}

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

