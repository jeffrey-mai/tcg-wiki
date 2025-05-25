
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  
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