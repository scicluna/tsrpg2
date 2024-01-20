import { abilityParser } from "./abilityparser";
import { itemParser } from "./itemparser";
import { parseLocation } from "./locationparser";
import { parseMonster } from "./monsterparser";
import { parseScenario } from "./scenarioparser";

export async function parseAll(){
    try {
        const abilityDict = await abilityParser();
        const itemDict = await itemParser();
        const monsterDict = await parseMonster(abilityDict!, itemDict!);
        const scenarioDict = await parseScenario(monsterDict!);
        const locationDict = await parseLocation(scenarioDict!);
        
        const worldLedger = {
            abilityDict,
            itemDict,
            monsterDict,
            scenarioDict,
            locationDict
        }
        return worldLedger;
    } catch (error) {
        console.log(error)
    }
}