import Link from "next/link";
import Card from "./components/Card";
import { api } from "./services/api";

import { Contatos } from "./types/contact";

export default async function Home() {
  const response = await api.get("/contatos");
  const contatos: Contatos[] = response.data;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[16px] row-start-1 items-center md:w-lg w-full">
        <Link href="/" className="flex flex-row">
          <h1 className="text-4xl">My</h1>
          <h1 className="text-purple-800 text-4xl font-semibold">Contacts</h1>
        </Link>

        <Card contatos={contatos} />
      </main>
    </div>
  );
}
