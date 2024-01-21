import { Ability } from "./ability";
import { Monster } from "./creatures";
import { Consumable, Equipment } from "./items";
import { WorldLocation } from "./location";
import { DialogueScenario, EncounterScenario } from "./scenario";

export type WorldLedger = {
    abilityDict: {
        [key: string]: Ability;
    };
    itemDict: {
        [x: string]: Consumable | Equipment;
    } | undefined;
    monsterDict: {
        [key: string]: Monster;
    };
    scenarioDict: {
        [key: string]: DialogueScenario | EncounterScenario;
    };
    locationDict: {
        [key: string]: WorldLocation;
    };
}