import fs from 'fs/promises';
import { Ability } from "@/types/ability";
import { Item } from "@/types/items";
import { extractOptions, extractString } from './parserutils';
import { DialogueScenario } from '@/types/scenario';

export async function parseScenario( abilityDict: {[key: string]: Ability}, itemDict: {[key: string]: Item}, monsterDict: {[key: string]: Monster}){
    const dialogues = await parseDialogues();
    const encounters = await parseEncounters();
    return {...dialogues, ...encounters};

    async function parseDialogues(){
        const dialogueFiles = await fs.readdir(`./world/scenarios/dialogues`, 'utf-8');
        const dialogueDict: {[key: string]: DialogueScenario} = {};

        for (const fileName of dialogueFiles){
            const filePath = `./world/scenarios/dialogues/${fileName}`;
            const fileContent = await fs.readFile(filePath, 'utf-8');

            const name = fileName.trim().toLowerCase().replace('.md', '');
            if (dialogueDict[name]){
                throw new Error(`Duplicate ability name: ${name}`);
            } 

            const description = extractString(fileContent, 'Description') || "no description";

            const options = extractOptions(fileContent, abilityDict, itemDict, monsterDict, fileName);

            dialogueDict[name] = {name, type: "Dialogue", description, options, completed: false };
        }

        return dialogueDict;
    }
    
    async function parseEncounters(){
        return {};
    }
}

