import { Ability } from "./ability";
import { Item } from "./items";

export interface Option {
    description: string;
    outcomes: Outcome[];
    linkedScenario: Scenario|null;
    conditions?: Condition[]; 
}

export type OutcomeType = 
    "hp" | //expects value of integer
    "dmg" | //expects value of integer
    "loot"| //expects value of Loot
    "xp"| // expects value of integer
    "ability"| // expects value of Ability
    "status"| // expects value of StatusEffect
    "none" // no outcome
 

export type Outcome = HpOutcome | DmgOutcome | LootOutcome | XpOutcome | AbilityOutcome | StatusOutcome | NoOutcome;

interface BaseOutcome {
    type: OutcomeType;
}

interface HpOutcome extends BaseOutcome {
    type: "hp";
    value: number;
}

interface DmgOutcome extends BaseOutcome {
    type: "dmg";
    value: number;
}

interface LootOutcome extends BaseOutcome {
    type: "loot";
    value: string; // referencing an item
}

interface XpOutcome extends BaseOutcome {
    type: "xp";
    value: number;
}

interface AbilityOutcome extends BaseOutcome {
    type: "ability";
    value: string; // referencing an ability
}

interface StatusOutcome extends BaseOutcome {
    type: "status";
    value: string; // referencing a status effect
}

interface NoOutcome extends BaseOutcome {
    type: "none";
    value: null;
}