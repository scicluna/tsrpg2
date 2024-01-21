import { parseAll } from "@/parser/main"
import { Hero } from "@/types/creatures";

export default async function Home() {

  const worldLedger = await parseAll();
  console.log(worldLedger)

  return (
     <main>hi</main>
  )
}
