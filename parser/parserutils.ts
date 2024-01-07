import { AbilityType } from "@/types/ability";
import { StatChange } from "@/types/items";
import { OutcomeType } from "@/types/optionoutcome";

export function extractString(content: string, key: string) {
    const regex = new RegExp(`## ${key}:\\s*(.+?)(\\r?\\n|$)`);
    const match = content.match(regex);
    return match ? match[1].trim() : null;
}

export function extractNumber(content: string, key: string){
    const value = extractString(content, key);
    return value ? parseFloat(value) : null;
}

export function parseStatusEffect(content: string) {
    const statusEffectRegex = /## Status Effect:\s*\r?\n- ([^\r\n]+)\r?\n- ([^\r\n]+)\r?\n- ([^\r\n]+)/;
    const match = content.match(statusEffectRegex);

    if (match) {
        const id = match[1].trim().toLowerCase().replace(' ', '_');
        const name = match[1].trim();
        const duration = parseInt(match[2].trim(), 10);
        const statChangePart = match[3].trim().split(' ');

        const statChange: StatChange = {}; // Add index signature

        if (statChangePart.length === 2) {
            const [stat, value] = statChangePart;
            statChange[stat as keyof StatChange] = parseInt(value);
        }

        return { id, name, duration, statChange };
    }

    return null;
}


export function isAbilityType(type: AbilityType | string): type is AbilityType {
    return Object.values(AbilityType).includes(type as AbilityType);
}

export function getKeysOfType<T>(): Array<keyof T> {
    return [] as Array<keyof T>;
}

export function extractList(content: string, listName: string): { [key: string]: string|number}[] {
    const regex = new RegExp(`## ${listName}:[\\r\\n]+([\\s\\S]+?)(?=\\r?\\n\\r?\\n)`);
    const match = content.match(regex);
    const results = [];

    if (match){
        const items = match[1].split('\r\n');

        for (let item of items){
            item = item.replace('- ', '')
            const [key, value] = item.split(' ');
            results.push({[key]: value});
        }
    }
    return results;
}

export function parseOutcomes(type: OutcomeType, value: string) {
    switch (type) {
        case "hp":
        case "dmg":
        case "xp":
            return { type, value: parseInt(value) };
        case "loot":
        case "ability":
        case "status":
            return { type, value };
        case "none":
            return { type, value: null };
    }
}

//e.x. for type = "hp"|"dmg"|"xp"
export function isPartOfStringType(validatorArray: string[], type: string): boolean {
    return validatorArray.includes(type);
}