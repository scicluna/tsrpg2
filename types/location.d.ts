type WorldLocation = {
    name: string;
    scenario: Scenario;
    connectedLocations: {location: WorldLocation, distance: number}[];
    background?: string; //link to image in images folder
    music?: string; //link to music in music folder
}







