import { BackgroundLines } from "@/components/ui/background-lines";

export default function Home() {
  return (
    <main>
      <BackgroundLines className="pointer-events-none flex items-center justify-center w-full flex-col px-4">
        <h2 className="bg-clip-text text-center bg-gradient-to-b text-white md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative font-bold tracking-tight">
          Welcome to TCG Wiki
        </h2>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-300 text-center">
          Deck build, explore the card database, and play all trading card games!
        </p>
      </BackgroundLines>
    </main>
  )
}
