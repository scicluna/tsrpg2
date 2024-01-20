import { parseAll } from "@/parser/main"

export default async function Home() {

  const worldLedger = await parseAll();
  console.log(worldLedger)

  return (
     <main>hi</main>
  )
}
