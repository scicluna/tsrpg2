import fs from 'fs/promises';
import { extractFromDict, extractOptions, extractString } from './parserutils';
import { DialogueScenario, EncounterScenario } from '@/types/scenario';

export async function parseScenario( monsterDict: {[key: string]: Monster}){
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
                throw new Error(`Duplicate dialogue name: ${name}`);
            } 

            const description = extractString(fileContent, 'Description') || "no description";

            const options = extractOptions(fileContent, fileName);

            dialogueDict[name] = {name, type: "Dialogue", description, options, completed: false };
        }

        return dialogueDict;
    }
    
    async function parseEncounters(){
        const encounterFiles = await fs.readdir(`./world/scenarios/encounters`, 'utf-8');
        const encounterDict: {[key: string]: EncounterScenario} = {};

        for (const fileName of encounterFiles){
            const filePath = `./world/scenarios/encounters/${fileName}`;
            const fileContent = await fs.readFile(filePath, 'utf-8');

            const name = fileName.trim().toLowerCase().replace('.md', '');
            if (encounterDict[name]){
                throw new Error(`Duplicate encounter name: ${name}`);
            }

            const description = extractString(fileContent, 'Description') || "no description";

            const monsters = extractFromDict<Monster>(monsterDict, fileContent, 'Monsters', fileName);
            const music = extractString(fileContent, 'Music')?.replace('[[', '').replace(']]', '') || "no music";

            encounterDict[name] = {name, type: "Encounter", description, monsters, music, completed: false};
        }
        return encounterDict;
    }
}

