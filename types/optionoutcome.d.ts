interface Option {
    description: string;
    outcomes: Outcome[];
    linkedScenario: Scenario|null;
    conditions?: Condition[]; 
}

enum OutcomeType {
    hp, //expects value of integer
    dmg, //expects value of integer
    loot, //expects value of Loot
    xp, // expects value of integer
    ability, // expects value of Ability
    none // no outcome
}

type Outcome = HpOutcome | DmgOutcome | LootOutcome | XpOutcome | AbilityOutcome | StatusOutcome | NoOutcome;

interface BaseOutcome {
    type: OutcomeType;
}

interface HpOutcome extends BaseOutcome {
    type: OutcomeType.hp;
    value: number;
}

interface DmgOutcome extends BaseOutcome {
    type: OutcomeType.dmg;
    value: number;
}

interface LootOutcome extends BaseOutcome {
    type: OutcomeType.loot;
    value: Loot;
}

interface XpOutcome extends BaseOutcome {
    type: OutcomeType.xp;
    value: number;
}

interface AbilityOutcome extends BaseOutcome {
    type: OutcomeType.ability;
    value: Ability;
}

interface StatusOutcome extends BaseOutcome {
    type: OutcomeType.status;
    value: StatusEffect;
}

interface NoOutcome extends BaseOutcome {
    type: OutcomeType.none;
}