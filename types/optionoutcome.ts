import { Condition } from "./conditions";

export interface Option {
    description: string;
    outcomes: Outcome[];
    linkedScenario: string|null;
    conditions?: Condition[]; 
}

export type OutcomeType = 
    "hp" | //expects value of integer
    "dmg" | //expects value of integer
    "loot"| //expects value of Loot
    "exp"| // expects value of integer
    "ability"| // expects value of Ability
    "status"| // expects value of StatusEffect
    "none" // no outcome

export const VALID_OUTCOME_TYPES: OutcomeType[] = ["hp", "dmg", "loot", "exp", "ability", "status", "none"];
 

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
    type: "exp";
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