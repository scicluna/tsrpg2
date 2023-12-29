type WorldLocation = {
    name: string;
    scenario: Scenario;
    connectedLocations: WorldLocation[]|null;
}

enum ScenarioType {
    Encounter,
    Dialogue
}

interface BaseScenario {
    id: number;
    name: string;
    type: ScenarioType;
    description: string;
    completed: boolean;
}

interface EncounterScenario extends BaseScenario {
    monsters: Monster[];
    loot: string[];
}

interface DialogueScenario extends BaseScenario {
    options: Option[];
}

type Scenario = EncounterScenario | DialogueScenario;

interface Option {
    description: string;
    outcomes: Outcome[];
    linkedScenario: Scenario|null;
    conditions?: Condition[]; 
}

type Condition = () => boolean;

enum OutcomeType {
    hp, //expects value of integer
    dmg, //expects value of integer
    loot, //expects value of Loot
    xp, // expects value of integer
    ability // expects value of Ability
}

type Outcome = HpOutcome | DmgOutcome | LootOutcome | XpOutcome | AbilityOutcome;

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

interface Creature {
    name: string;
    health: number;
    damage: number;
    defense: number;
    abilities: Ability[];
    sprite: string; //link from images folder
}

interface Monster extends Creature {
    loot: Loot[];
}

enum AbilityType {
    Magic,
    Skill
}

interface BaseAbility {
    name: string;
    type: AbilityType;
}

interface MagicAbility extends BaseAbility {
    type: AbilityType.Magic;
    cost: number;
    damage: number;
}

interface SkillAbility extends BaseAbility {
    type: AbilityType.Skill;
    damage: number;
}
