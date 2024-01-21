import { StatChange } from "./items";

export interface StatusEffect {
    id: string;
    name: string;
    duration: number;
    statChange: StatChange;
}

