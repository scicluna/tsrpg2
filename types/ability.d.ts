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
    aoe: boolean;
    damageType: DamageType;
}

interface MagicAbility extends BaseAbility {
    type: AbilityType.Magic;
    cost: number;
    damage: number;
    statusEffect?: StatusEffect;
}

interface SkillAbility extends BaseAbility {
    type: AbilityType.Skill;
    damage: number;
    statusEffect?: StatusEffect;
}
