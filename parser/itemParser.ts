import { Consumable, ConsumableType, Equipment, EquipmentType, Item, ItemType, VALID_CONSUMABLE_TYPES, VALID_EQUIPMENT_TYPES } from '@/types/items';
import fs from 'fs/promises';
import { extractList, extractNumber, extractString, isPartOfStringType, parseBooleanValue, parseOutcomes } from './parserutils';
import { Outcome, OutcomeType } from '@/types/optionoutcome';

export async function itemParser(){
    const consumables = await parseConsumables('consumables');
    const equipment = await parseEquipment('equipment');
    return {...consumables, ...equipment};
}

async function parseConsumables(consumableDir: string){
    const consumableFiles = await fs.readdir(`./world/items/${consumableDir}`, 'utf-8');
    const consumableDict: {[key: string]: Consumable} = {};

    for (const fileName of consumableFiles){
        const filePath = `./world/items/${consumableDir}/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');
        
        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (consumableDict[name]){
            throw new Error(`Duplicate ability name: ${name}`);
        } 

        const description = extractString(fileContent, 'Description') || "no description";
        
        const consumableType = extractString(fileContent, 'Consumable Type')?.trim().toLowerCase() as ConsumableType;
        if (!consumableType){
            throw new Error(`Required field 'Consumable Type' is missing in file ${fileName}`);
        }
        if (!isPartOfStringType(VALID_CONSUMABLE_TYPES, consumableType)){
            throw new Error(`Invalid consumable type '${consumableType}' in file ${fileName}`);
        }

        const self = parseBooleanValue(extractString(fileContent, 'Self'), 'Self', fileName);
        const aoe = parseBooleanValue(extractString(fileContent, 'AOE'), 'AOE', fileName);

        const outcomes = extractList(fileContent, 'Outcomes');
        if (!outcomes){
            throw new Error(`Required field 'Outcomes' is missing in file ${fileName}`);
        }
        const outcomeObjects: Outcome[] = [];
        for (const outcome of outcomes){
            const outcomeType = Object.keys(outcome)[0] as OutcomeType
            if (!outcomeType){
                throw new Error(`Invalid outcome type '${Object.keys(outcome)[0]}' in file ${fileName}`);
            }
            const outcomeObject = parseOutcomes(outcomeType, Object.values(outcome)[0].toString());
            outcomeObjects.push(outcomeObject);
        }

        const price = extractNumber(fileContent, 'Price') || 0;

        const consumable: Consumable = {
            id: name,
            name,
            description,
            itemType: "consumable",
            consumableType: consumableType,
            effects: outcomeObjects,
            self,
            aoe,
            price
        }
        consumableDict[name] = consumable;
    }
    return consumableDict;
}

async function parseEquipment(equipmentDir: string){
    const equipmentFiles = await fs.readdir(`./world/items/${equipmentDir}`, 'utf-8');
    const equipmentDict: {[key: string]: Equipment} = {};

    for (const fileName of equipmentFiles){
        const filePath = `./world/items/${equipmentDir}/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (equipmentDict[name]){
            throw new Error(`Duplicate ability name: ${name}`);
        } 

        const description = extractString(fileContent, 'Description') || "no description";

        const equipmentType = extractString(fileContent, 'Slot')?.trim().toLowerCase() as EquipmentType;
        if (!equipmentType){
            throw new Error(`Required field 'Slot' is missing in file ${fileName}`);
        }
        if (!isPartOfStringType(VALID_EQUIPMENT_TYPES, equipmentType)){
            throw new Error(`Invalid equipment type '${equipmentType}' in file ${fileName}`);
        }

        const stats = extractList(fileContent, 'Stats');
        if (!stats){
            throw new Error(`Required field 'Stats' is missing in file ${fileName}`);
        }
        const statObject: {[key: string]: any} = {};
        for (const stat of stats){
            const statType = Object.keys(stat)[0];
            if (!statType){
                throw new Error(`Invalid stat type '${Object.keys(stat)[0]}' in file ${fileName}`);
            }
            const statValue = Object.values(stat)[0];
            statObject[statType] = statValue;
        }

        const price = extractNumber(fileContent, 'Price') || 0;

        const equipment: Equipment = {
            id: name,
            name,
            description,
            itemType: "equipment",
            equipmentType: equipmentType,
            statBoosts: statObject,
            price
        }

        equipmentDict[name] = equipment;
    }
    return equipmentDict;
}