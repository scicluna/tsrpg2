import fs from 'fs/promises';
import { Ability } from "@/types/ability";
import { extractDamageTypes, extractSimpleNumber } from './parserutils';

export async function parseMonster(abilityDict: { [key: string]: Ability }) {
    const monsterFiles = await fs.readdir('./world/monsters', 'utf-8');
    const monsterDict: { [key: string]: Ability } = {};

    for (const fileName of monsterFiles){
        const filePath = `./world/monsters/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (monsterDict[name]){
            throw new Error(`Duplicate ability name: ${name}`);
        } 

        const hp = extractSimpleNumber(fileContent, 'HP');
        if (!hp){
            throw new Error(`Required field 'HP' is missing in file ${fileName}`);
        }

        const damage = extractSimpleNumber(fileContent, 'Damage');
        if (!damage){
            throw new Error(`Required field 'Damage' is missing in file ${fileName}`);
        }

        const defense = extractSimpleNumber(fileContent, 'Defense');
        if (!defense){
            throw new Error(`Required field 'Defense' is missing in file ${fileName}`);
        }

        extractDamageTypes(fileContent, 'Resistances'); 

        extractDamageTypes(fileContent, 'Vulnerabilities');

    }
}