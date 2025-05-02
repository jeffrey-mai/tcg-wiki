import { DeckBuildID } from "@/types";

export default function Page(props: DeckBuildID) {
  const { id } = props.params;
  
  return (
    <main>
      <div>
        <div className="h-[50vh] flex justify-center items-center">
          <p>Deck Build: {id}</p>
        </div>
      </div>
    </main>
  )
}