enum ItemType  {
    Consumable,
    Equipment
}

interface Item {
    id: string;
    name: string;
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
}

///////////////////////////

interface Equipment extends Item {
    equipmentType: EquipmentType;
    statBoosts: StatChange;
}

interface StatChange {
    health?: number;
    mana?: number;
    attack?: number;
    defense?: number;
}