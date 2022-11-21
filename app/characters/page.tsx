import Head from "next/head";
import Link from "next/link";
import styles from "./Characters.module.css";
import PocketBase from 'pocketbase';
import CreateCharacter from "./CreateCharacter";

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

async function getCharacters() {
  const db = new PocketBase('http://127.0.0.1:8090');
  const res = await (await db.collection('characters').getList(1, 5, dynamic));
  // const res = await fetch(
  //   "http://127.0.0.1:8090/api/collections/characters/records?page=1&perPage=30",
  //   {cache: 'no-store'}
  // );
  return res.items as any[];
}

export default async function CharactersPage() {
  const characters = await getCharacters();
  return (
    <div>
      <Head>
        <title>Characters</title>
      </Head>

      <main>
        <h1>Welcome to the characters page !</h1>
        <div className={styles.grid}>
          {characters?.map((char) => {
            return <Character key={char.id} character={char} />;
          })}
        </div>

        <CreateCharacter />
      </main>
    </div>
  );
}

function Character({ character }) {
  const { id, name, cls, description } = character || {};
  return (
    <Link href={`/characters/${id}`}>
      <div className={styles.char}>
        <h2>{name}</h2>
        <h5>{cls}</h5>
      </div>
    </Link>
  );
}
