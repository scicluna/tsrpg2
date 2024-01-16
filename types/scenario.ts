import { Option } from './optionoutcome'; 
// Import the Option type
export type ScenarioType = "Encounter" | "Dialogue";
export const VALID_SCENARIO_TYPE = ["Encounter", "Dialogue"];

export interface BaseScenario {
    name: string;
    type: ScenarioType;
    completed: boolean;
}

export interface EncounterScenario extends BaseScenario {
    monsters: Monster[];
    loot: string[];
    music?: string;
}

export interface DialogueScenario extends BaseScenario {
    description: string;
    options: Option[];
}

export type Scenario = EncounterScenario | DialogueScenario;