import PocketBase from "pocketbase";

async function getCharacter(charId: string) {
  const db = new PocketBase("http://127.0.0.1:8090");
  const res = await db.collection("characters").getOne(charId);

  return res;
}

export default async function CharacterPage({ params }: any) {
    const char = await getCharacter(params.id);

    return (
        <div>
            <h1>char/{char.name}</h1>
        </div>
    )
}
