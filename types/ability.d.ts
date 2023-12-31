enum AbilityType {
    Magic,
    Skill
}

enum DamageType {
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

interface BaseAbility {
    name: string;
    type: AbilityType;
    damageMult?: number;
    damageBonus?: number;
    damageType?: DamageType;
    self?: boolean;
    aoe: boolean;
    statusEffect?: StatusEffect;
}

interface MagicAbility extends BaseAbility {
    type: AbilityType.Magic;
    cost: number;
}

interface SkillAbility extends BaseAbility {
    type: AbilityType.Skill;
}
