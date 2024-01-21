import { Hero } from "@/types/creatures";
import { WorldLedger } from "@/types/ledger";

export function getHero(worldLedger: WorldLedger){

    const hero: Hero = {
        name: "Hero",
        level: 1,
        xp: 0,
        maxHp: 10,
        hp: 10,
        maxMp: 10,  
        mp: 10,
        damage: 2,
        defense: 0,
        resistances: [],
        weaknesses: [],
        gold: 0,
        inventory: [],
        equipped: {
          weapon: null,
          armor: null,
          accessory: null,
        },
        abilities: [
          worldLedger.abilityDict["basic"]
        ],
        statusEffects: [],
        location: worldLedger.locationDict["start"],
        timeElapsed: 0,
        sprite: "hero",
      };

      return hero;
}