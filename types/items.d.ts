enum ItemType  {
    Consumable,
    Equipment
}

interface Item {
    id: string;
    name: string;
    description: string;
    itemType: ItemType;
    price: number;
}

////////////////////////

enum ConsumableType {
    Healing,
    Mana,
    Buff,
    Debuff
}

interface Consumable extends Item {
    effects: Outcome[];
    self?: boolean;
    aoe?: boolean;
}

///////////////////////////

enum EquipmentType {
    Weapon, 
    Chest,
    Legs,
    Head,
    Cloak,
    Accessory,
    Gloves,
    Boots
}

interface Equipment extends Item {
    equipmentType: EquipmentType;
    statBoosts: StatChange;
}

interface StatChange {
    hp?: number;
    mp?: number;
    dmg?: number;
    def?: number;
}

