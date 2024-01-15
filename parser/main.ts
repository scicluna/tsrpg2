import { abilityParser } from "./abilityparser";
import { itemParser } from "./itemParser";
import { parseMonster } from "./monsterparser";

export async function parseAll(){
    try {
        const abilityDict = await abilityParser();
        const itemDict = await itemParser();
        const monsterDict = await parseMonster(abilityDict!, itemDict!);
        console.log(monsterDict)
    } catch (error) {
        console.log(error)
    }
}