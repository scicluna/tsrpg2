export type AbilityType = 'Magic' | 'Skill';

export const VALID_ABILITY_TYPE: AbilityType[] = [
    "Magic",
    "Skill",
];

export type DamageType = "Physical" | "Fire" | "Ice" | "Lightning" | "Holy" | "Dark" | "Poison" | "Bleed" | "Earth" | "Wind" | "Water" | "Chaos" | "None";

export const VALID_DAMAGE_TYPE: DamageType[] = [
    "Physical",
    "Fire",
    "Ice",
    "Lightning",
    "Holy",
    "Dark",
    "Poison",
    "Bleed",
    "Earth",
    "Wind",
    "Water",
    "Chaos",
    "None",
];

export interface BaseAbility {
    name: string;
    type: AbilityType;
    damageMult?: number;
    damageBonus?: number;
    damageType?: DamageType;
    self?: boolean;
    aoe: boolean;
    statusEffect?: StatusEffect;
}

export interface MagicAbility extends BaseAbility {
    type: "Magic";
    cost: number;
}

export interface SkillAbility extends BaseAbility {
    type: "Skill";
}

export type Ability = MagicAbility | SkillAbility;