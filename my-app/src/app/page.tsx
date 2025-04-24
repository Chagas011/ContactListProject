"use client";
import Link from "next/link";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { Contatos } from "./types/contact";
import { api } from "./services/api";

export default function Home() {
  const [contatos, setContatos] = useState<Contatos[]>([]);
  const [search, setSearch] = useState("");

  const filteredContatos = contatos.filter((contato) =>
    contato.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchContatos = async () => {
      try {
        const { data } = await api.get("/contatos");
        setContatos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchContatos();
  }, []);

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="grid grid-rows-[1fr_1fr_20px] items-center justify-items-center min-h-screen p-8  gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[16px] row-start-1 items-center md:w-lg w-full">
        <Link href="/" className="flex flex-row">
          <h1 className="text-4xl">My</h1>
          <h1 className="text-purple-800 text-4xl font-semibold">Contacts</h1>
        </Link>

        <form action="" className="mt-[48px]">
          <input
            value={search}
            type="text"
            placeholder="Pesquise pelo nome..."
            onChange={handleChangeSearch}
            className="border border-zinc-700 rounded-2xl p-2 md:w-96 w-80"
          />
        </form>

        <div className="mt-8 w-full">
          <div className="flex flex-row justify-between">
            <span className="p-2 text-xl font-semibold">
              {filteredContatos.length} Contatos
            </span>
            <Link
              href="/novo"
              className="grid items-center border border-purple-950 rounded-lg hover:bg-purple-800 hover:text-white w-[150px] text-center text-purple-600 "
            >
              Novo Contato
            </Link>
          </div>
        </div>
        <Card contatos={filteredContatos} />
      </main>
    </div>
  );
}
