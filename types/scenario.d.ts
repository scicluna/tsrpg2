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