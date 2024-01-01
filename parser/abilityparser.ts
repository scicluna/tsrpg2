import fs from 'fs/promises';
import { extractSimpleNumber, extractSimpleString, getKeysOfType, isAbilityType, parseStatusEffect } from './parserutils';
import { Ability, AbilityType, DamageType, MagicAbility, SkillAbility } from '@/types/ability';
import { StatChange, VALID_STAT_CHANGE_KEYS } from '@/types/items';

export async function abilityParser(){
    const abilityFiles = await fs.readdir('./world/abilities', 'utf-8');
    const abilityDict: { [key: string]: Ability } = {};

    for (const fileName of abilityFiles){
        const filePath = `./world/abilities/${fileName}`;
        const fileContent = await fs.readFile(filePath, 'utf-8');

        const name = fileName.trim().toLowerCase().replace('.md', '');
        if (abilityDict[name]){
            throw new Error(`Duplicate ability name: ${name}`);
        } 

        const rawAbilityType = extractSimpleString(fileContent, 'Ability Type');
        if (!rawAbilityType){
            throw new Error(`Required field 'Ability Type' is missing in file ${fileName}`);
        } 

        const abilityType = Object.values(AbilityType).find(enumValue => enumValue === rawAbilityType);
        if (!abilityType){
            throw new Error(`Invalid ability type '${rawAbilityType}' in file ${fileName}`);
        } 

        const cost = extractSimpleNumber(fileContent, 'MP Cost') || undefined;
        
        const damageMultiplier = extractSimpleNumber(fileContent, 'Damage Multiplier') || undefined;
        const damageBonus = extractSimpleNumber(fileContent, 'Damage Bonus') || undefined;
    
        const rawDamageType = extractSimpleString(fileContent, 'Damage Type') || undefined;
        let damageType = undefined;
        if (rawDamageType){
            damageType =  Object.values(DamageType).find(enumValue => enumValue === rawDamageType);
            if (!damageType){
                throw new Error(`Invalid damage type '${rawDamageType}' in file ${fileName}`);
            }
        }

        const self = extractSimpleString(fileContent, 'Self')?.trim().toLocaleLowerCase() === 'true' || false;
        const aoe = extractSimpleString(fileContent, 'AOE')?.trim().toLocaleLowerCase() === 'true' || false;
        
        const statusEffect = parseStatusEffect(fileContent) || undefined;
        if (statusEffect && statusEffect.statChange){
            const statChangeKeys = Object.keys(statusEffect.statChange);
            for (const key of statChangeKeys) {
                if (!VALID_STAT_CHANGE_KEYS.includes(key as keyof StatChange)) {
                    throw new Error(`Invalid stat change key '${key}' in file ${fileName}`);
                }
            }   
        }

        if (isAbilityType(abilityType)) {
            if (abilityType === AbilityType.Magic) {
                const magicAbility: MagicAbility = {
                    name,
                    type: abilityType,
                    cost: cost || 0,
                    damageMult: damageMultiplier,
                    damageBonus,
                    damageType: damageType as DamageType,
                    self,
                    aoe,
                    statusEffect,
                };
                abilityDict[name] = magicAbility;
            } else if (abilityType === AbilityType.Skill) {
                const skillAbility: SkillAbility = {
                    name,
                    type: abilityType,
                    damageMult: damageMultiplier,
                    damageBonus,
                    damageType: damageType as DamageType,
                    self,
                    aoe,
                    statusEffect,
                };
                abilityDict[name] = skillAbility;
            } else {
                throw new Error(`Unknown ability type '${abilityType}' in file ${fileName}`);
            }
        }
    }
    return abilityDict;
}

