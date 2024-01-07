import { abilityParser } from "./abilityparser";
import { itemParser } from "./itemParser";
import { parseMonster } from "./monsterparser";

export async function parseAll(){
    try {
        const abilityDict = await abilityParser();
        const itemDict = await itemParser();
        console.log(itemDict)
    } catch (error) {
        console.log(error)
    }
    
    
}