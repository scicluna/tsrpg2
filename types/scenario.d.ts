enum ScenarioType {
    Encounter,
    Dialogue
}

interface BaseScenario {
    id: number;
    name: string;
    type: ScenarioType;
    completed: boolean;
}

interface EncounterScenario extends BaseScenario {
    monsters: Monster[];
    loot: string[];
    music?: string;
}

interface DialogueScenario extends BaseScenario {
    description: string;
    options: Option[];
}

type Scenario = EncounterScenario | DialogueScenario;