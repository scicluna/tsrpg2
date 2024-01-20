import { Scenario } from "./scenario";

export type WorldLocation = {
    name: string;
    scenario: Scenario;
    connectedLocations: {locationName: string, distance: number}[];
    background?: string; //link to image in images folder
    music?: string; //link to music in music folder
}







