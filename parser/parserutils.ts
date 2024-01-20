import { Ability } from "@/types/ability";
import { Condition, NoCondition, ConditionType, HasMoneyCondition, HasAbilityCondition, ArrivedInTimeCondition, HasMinimumLevelCondition, HasFlagCondition, VALID_CONDITION_TYPE } from "@/types/conditions";
import { Item, StatChange } from "@/types/items";
import { Option, Outcome, OutcomeType, VALID_OUTCOME_TYPES } from "@/types/optionoutcome";

export function extractString(content: string, key: string) {
    const regex = new RegExp(`## ${key}:?\\s*(.+?)(\\r?\\n|$)`);
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


export function getKeysOfType<T>(): Array<keyof T> {
    return [] as Array<keyof T>;
}

export function isTypeOf<T>(validatorArray: any[], value: any): value is T {
    return validatorArray.includes(value);
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
        case "exp":
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

export function extractFromDict<T>(dict: { [key: string]: T }, content: string, description: string, fileName: string): T[] {
    const regex = new RegExp(`## ${description}:[\\r\\n]+([\\s\\S]+?)(?=\\r?\\n\\r?\\n)`);
    const match = content.match(regex);
    const results = [];

    if (match){
        const things = match[1].split('\r\n');

        for (let thing of things){
            thing = thing.replace('- ', '').replace('[[', '').replace(']]', '');
            if (!dict[thing]){
                throw new Error(`Invalid ${description}Dict item: '${thing}' in file ${fileName}`);
            }
            results.push(dict[thing]);
        }
    }
    return results;
}

export function extractOptions(content: string, fileName: string): Option[]{
    const optionsSectionRegex = new RegExp(`## Options:\r?\n\r?\n([\\s\\S]*?)$`, 'g');
    const optionsSectionMatch = optionsSectionRegex.exec(content);

    if (!optionsSectionMatch) return [];

    const optionRegex = /### Option:\r?\nDescription:\s*\r?\n([\s\S]*?)(?:\r?\n\r?\nOutcomes:\s*\r?\n- ([\s\S]*?))?(?:\r?\n\r?\nConditions:\s*\r?\n- ([\s\S]*?))?(?:\r?\n\r?\nLinked Scenario:\s*\r?\n(\[\[[\s\S]*?\]\])?)/gs;
    const optionsContent = optionsSectionMatch[1];
    const options: Option[] = [];
    const optionMatches = [...optionsContent.matchAll(optionRegex)];

    for (const match of optionMatches) {
        const outcomes = match[2].split('\r\n- ') ?? ['none'];
        const outcomeObjects: Outcome[] = [];

        for (const outcome of outcomes){
            const [type, value] = outcome.split(' ');
            if (!isPartOfStringType(VALID_OUTCOME_TYPES, type)){
                throw new Error(`Invalid outcome type '${type}' in file ${fileName}`);
            }            
            const outcomeObject = parseOutcomes(type as OutcomeType, value) as Outcome;
            outcomeObjects.push(outcomeObject); 
        }

        const conditions = match[3].split('\r\n- ') ?? ['none'];
        const conditionObjects: Condition[] = [];

        for (const condition of conditions){
            const [type, value] = condition.split(' ');
            if (!isPartOfStringType(VALID_CONDITION_TYPE, type)){
                throw new Error(`Invalid condition type '${type}' in file ${fileName}`);
            }
            const conditionObject = parseCondition(type as ConditionType,  value);
            conditionObjects.push(conditionObject); 
        }

        options.push({
            description: match[1].trim(),
            outcomes: outcomeObjects,
            conditions: conditionObjects,
            linkedScenario: match[4]?.trim().replace('[[', '').replace(']]', '') || ''
        });
    }

    return options;
}

function parseCondition(type: ConditionType, value: string): Condition | NoCondition {

    switch (type) {
        case 'HasMoney':
            return { type: "HasMoney", value: Number(value) } as HasMoneyCondition; 
        case 'HasAbility':
            return { type: "HasAbility", value: value } as HasAbilityCondition;
        case 'ArrivedInTime':
            return { type: "ArrivedInTime", value: Number(value) } as ArrivedInTimeCondition;
        case 'HasMinimumLevel':
            return { type: "HasMinimumLevel", value: Number(value) } as HasMinimumLevelCondition;
        case 'HasFlag':
            return { type: "HasFlag", value: value } as HasFlagCondition;
        case 'none':
            return { type: "none" } as NoCondition;
        default:
            throw new Error(`Unknown condition type: ${type}`);
    }
}

export function extractConnectedLocations(content: string): {locationName: string, distance: number}[]{
    const regex = new RegExp(`## Connected Locations:[\\r\\n]+([\\s\\S]+?)(?=\\r?\\n\\r?\\n)`);
    const match = content.match(regex);
    const results = [];

    if (match){
        const locations = match[1].split('\r\n');

        for (let location of locations){
            location = location.replace('- ', '');
            const [locationName, distance] = location.split(' ');
            results.push({locationName, distance: parseInt(distance)});
        }
    }
    return results;
}