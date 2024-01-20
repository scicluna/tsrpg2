import fs from 'fs/promises';
import { WorldLocation } from "@/types/location";
import { Scenario } from "@/types/scenario";
import { extractConnectedLocations, extractFromDict, extractString } from './parserutils';

 export async function parseLocation(scenarioDict: {[key: string]: Scenario}){
    const locationFiles = await fs.readdir(`./world/locations`, 'utf-8');
    const locationDict: {[key: string]: WorldLocation} = {};
    
    for (const fileName of locationFiles){
        const filePath = `./world/locations/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (locationDict[name]){
            throw new Error(`Duplicate location name: ${name}`);
        }

        const scenario = extractFromDict<Scenario>(scenarioDict, fileContent, 'Scenario', fileName)[0];
        const connectedLocations = extractConnectedLocations(fileContent);
        const background = extractString(fileContent, 'Background')?.replace('[[', '').replace(']]', '') || "no background";
        const music = extractString(fileContent, 'Music')?.replace('[[', '').replace(']]', '') || "no music";

        locationDict[name] = {name, scenario, connectedLocations, background, music};
    }
    return locationDict;
 }