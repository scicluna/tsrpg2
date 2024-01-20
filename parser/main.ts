import { abilityParser } from "./abilityparser";
import { itemParser } from "./itemParser";
import { parseMonster } from "./monsterparser";
import { parseScenario } from "./scenarioparser";

export async function parseAll(){
    try {
        const abilityDict = await abilityParser();
        const itemDict = await itemParser();
        const monsterDict = await parseMonster(abilityDict!, itemDict!);
        const scenarioDict = await parseScenario(monsterDict!);
        console.log(scenarioDict)
    } catch (error) {
        console.log(error)
    }
}