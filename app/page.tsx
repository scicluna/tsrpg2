import MainGame from "@/components/MainGame";
import { parseAll } from "@/parser/main"
import { WorldLedger } from "@/types/ledger";
import { getHero } from "@/utils/getHero";

export default async function Home() {

  try {
    const worldLedger: WorldLedger = await parseAll();
    if (!worldLedger) {
      throw new Error(`World failed to parse - problem unknown`);
    }
    const hero = getHero(worldLedger);
    return (
      <MainGame worldLedger={worldLedger} hero={hero}/>
   )
  } catch (err: any){
    return <h1>Error: {err.message}</h1>
  }
}

