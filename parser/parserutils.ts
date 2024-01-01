import { AbilityType } from "@/types/ability";
import { StatChange } from "@/types/items";

export function extractSimpleString(content: string, key: string) {
    const regex = new RegExp(`## ${key}:\\s*(.+?)(\\r?\\n|$)`);
    const match = content.match(regex);
    return match ? match[1].trim() : null;
}

export function extractSimpleNumber(content: string, key: string){
    const value = extractSimpleString(content, key);
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
