type WorldLocation = {
    name: string;
    scenario: Scenario;
    connectedLocations: {location: WorldLocation, distance: number}[];
}







