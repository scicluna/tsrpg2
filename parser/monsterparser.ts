import fs from 'fs/promises';
import { Ability, DamageType, VALID_DAMAGE_TYPE } from "@/types/ability";
import {extractFromDict, extractList, extractNumber, extractString, isTypeOf } from './parserutils';
import { Item } from '@/types/items';

export async function parseMonster(abilityDict: { [key: string]: Ability }, itemDict: { [key: string]: Item }) {
    const monsterFiles = await fs.readdir('./world/monsters', 'utf-8');
    const monsterDict: { [key: string]: Monster } = {};

    for (const fileName of monsterFiles){
        const filePath = `./world/monsters/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (monsterDict[name]){
            throw new Error(`Duplicate ability name: ${name}`);
        } 

        const hp = extractNumber(fileContent, 'HP');
        if (!hp){
            throw new Error(`Required field 'HP' is missing in file ${fileName}`);
        }

        const damage = extractNumber(fileContent, 'Damage');
        if (damage == null){
            throw new Error(`Required field 'Damage' is missing in file ${fileName}`);
        }

        const defense = extractNumber(fileContent, 'Defense');
        if (defense == null){
            throw new Error(`Required field 'Defense' is missing in file ${fileName}`);
        }

        const resistances = extractList(fileContent, 'Resistances') || [];
        resistances.forEach((resistance) => {
            const resistanceType = Object.keys(resistance)[0];
            if (!isTypeOf<DamageType>(VALID_DAMAGE_TYPE, resistanceType)){
                throw new Error(`Invalid damage type '${resistance.type}' in file ${fileName}`);
            }
        });

        const weaknesses = extractList(fileContent, 'Weaknesses') || [];
        weaknesses.forEach((vulnerability) => {
            const vulnerabilityType = Object.keys(vulnerability)[0];
            if (!isTypeOf<DamageType>(VALID_DAMAGE_TYPE, vulnerabilityType)){
                throw new Error(`Invalid damage type '${vulnerability.type}' in file ${fileName}`);
            }
        });

        const abilities = extractFromDict<Ability>(abilityDict, fileContent, "Abilities", fileName) || [];
        const loot = extractFromDict<Item>(itemDict, fileContent, "Loot", fileName) || [];

        const gold = extractNumber(fileContent, 'Gold');
        if (gold == null){
            throw new Error(`Required field 'Gold' is missing in file ${fileName}`);
        }

        const exp = extractNumber(fileContent, 'Exp');
        if (exp == null){
            throw new Error(`Required field 'Exp' is missing in file ${fileName}`);
        }

        const sprite = extractString(fileContent, "Sprite")?.replace('[[', '')?.replace(']]', '') || "";

        const monster: Monster = {
            name,
            hp,
            damage,
            defense,
            resistances,
            weaknesses,
            abilities,
            loot,
            gold,
            exp,
            sprite,
            statusEffects: [],
        }
        monsterDict[name] = monster;
    }
    return monsterDict;
}