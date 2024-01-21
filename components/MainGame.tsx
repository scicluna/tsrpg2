import { Hero } from "@/types/creatures";
import { WorldLedger } from "@/types/ledger";

type MainGameProps ={
    worldLedger: WorldLedger;
    hero: Hero;
}

export default function MainGame({worldLedger, hero}: MainGameProps){
    return (
        <div>
        <h1>Game</h1>
        </div>
    )
}