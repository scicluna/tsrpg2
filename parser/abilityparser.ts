import fs from 'fs/promises';
import { extractNumber, extractString, isTypeOf, parseStatusEffect } from './parserutils';
import { Ability, AbilityType, DamageType, MagicAbility, SkillAbility, VALID_ABILITY_TYPE, VALID_DAMAGE_TYPE } from '@/types/ability';
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

        const rawAbilityType = extractString(fileContent, 'Ability Type');
        if (!rawAbilityType){
            throw new Error(`Required field 'Ability Type' is missing in file ${fileName}`);
        } 

        if (rawAbilityType != 'Magic' && rawAbilityType != 'Skill'){
            throw new Error(`Invalid ability type '${rawAbilityType}' in file ${fileName}`);
        } 

        const cost = extractNumber(fileContent, 'MP Cost') || undefined;
        
        const damageMultiplier = extractNumber(fileContent, 'Damage Multiplier') || undefined;
        const damageBonus = extractNumber(fileContent, 'Damage Bonus') || undefined;
    
        const rawDamageType = extractString(fileContent, 'Damage Type') || undefined;
        if (!rawDamageType){
            throw new Error(`Required field 'Damage Type' is missing in file ${fileName}`);
        }
        if (!isTypeOf<DamageType>(VALID_DAMAGE_TYPE, rawDamageType)){
            throw new Error(`Invalid damage type '${rawDamageType}' in file ${fileName}`);
        }

        const self = extractString(fileContent, 'Self')?.trim().toLocaleLowerCase() === 'true' || false;
        const aoe = extractString(fileContent, 'AOE')?.trim().toLocaleLowerCase() === 'true' || false;
        
        const statusEffect = parseStatusEffect(fileContent) || undefined;
        if (statusEffect && statusEffect.statChange){
            const statChangeKeys = Object.keys(statusEffect.statChange);
            for (const key of statChangeKeys) {
                if (!VALID_STAT_CHANGE_KEYS.includes(key as keyof StatChange)) {
                    throw new Error(`Invalid stat change key '${key}' in file ${fileName}`);
                }
            }   
        }

        if (isTypeOf<AbilityType>(VALID_ABILITY_TYPE, rawAbilityType)) {
            if (rawAbilityType === "Magic") {
                const magicAbility: MagicAbility = {
                    name,
                    type: rawAbilityType,
                    cost: cost || 0,
                    damageMult: damageMultiplier,
                    damageBonus,
                    damageType: rawDamageType,
                    self,
                    aoe,
                    statusEffect,
                };
                abilityDict[name] = magicAbility;
            } else if (rawAbilityType === "Skill") {
                const skillAbility: SkillAbility = {
                    name,
                    type: rawAbilityType,
                    damageMult: damageMultiplier,
                    damageBonus,
                    damageType: rawDamageType,
                    self,
                    aoe,
                    statusEffect,
                };
                abilityDict[name] = skillAbility;
            } else {
                throw new Error(`Unknown ability type '${rawAbilityType}' in file ${fileName}`);
            }
        }
    }
    return abilityDict;
}

