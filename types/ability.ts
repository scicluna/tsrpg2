export enum AbilityType {
    Magic = 'Magic',
    Skill = 'Skill'
}

export enum DamageType {
    Physical,
    Fire,
    Ice,
    Lightning,
    Holy,
    Dark,
    Poison,
    Bleed,
    Earth,
    Wind,
    Water,
    Chaos
}

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
    type: AbilityType.Magic;
    cost: number;
}

export interface SkillAbility extends BaseAbility {
    type: AbilityType.Skill;
}

export type Ability = MagicAbility | SkillAbility;