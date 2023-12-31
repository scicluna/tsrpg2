import { abilityParser } from "./abilityparser";

export async function parseAll(){
    try {
        const abilityDict = await abilityParser();
        console.log(abilityDict)
    } catch (error) {
        console.log(error)
    }
    
    
}