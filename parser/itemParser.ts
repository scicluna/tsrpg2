import { Consumable, Equipment, Item } from '@/types/items';
import fs from 'fs/promises';
import { extractOutcomes, extractSimpleString } from './parserutils';

export async function itemParser(){
    const itemFiles = await fs.readdir('./world/items', 'utf-8');
    const itemDict: { ['consumables']: {[key: string]: Consumable}, ['equipment']: {[key: string]: Equipment} } = {
        consumables: {},
        equipment: {}
    };

    console.log(itemFiles)
    itemDict.consumables = await parseConsumables('consumables');
    itemDict.equipment = await parseEquipment('equipment');
}

async function parseConsumables(consumableDir: string){
    const consumableFiles = await fs.readdir(`./world/items/${consumableDir}`, 'utf-8');

    for (const fileName of consumableFiles){
        const filePath = `./world/items/${consumableDir}/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const consumableDict: {[key: string]: Consumable} = {};

        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (consumableDict[name]){
            throw new Error(`Duplicate ability name: ${name}`);
        } 

        const description = extractSimpleString(fileContent, 'Description') || "no description";
        
        const consumableType = extractSimpleString(fileContent, 'Consumable Type');
        if (!consumableType){
            throw new Error(`Required field 'Consumable Type' is missing in file ${fileName}`);
        }

        const self = extractSimpleString(fileContent, 'Self')?.trim().toLocaleLowerCase() === 'true' || false;
        const aoe = extractSimpleString(fileContent, 'AOE')?.trim().toLocaleLowerCase() === 'true' || false;

        const outcomes = extractOutcomes(fileContent);



    }
}

async function parseEquipment(equipmentDir: string){
    const equipmentFiles = await fs.readdir(`./world/items/${equipmentDir}`, 'utf-8');

    for (const fileName of equipmentFiles){
        const filePath = `./world/items/${equipmentDir}/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');
    }
}