"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useContact } from "../hooks/useContact";
import { Contatos } from "../types/contact";
import { useState } from "react";

export interface CardProps {
  contatos: Contatos[];
}

export default function Card(props: CardProps) {
  const { handleDeleteConfirm } = useContact();
  const [search, setSearch] = useState("");
  const filteredContacts = props.contatos.filter((contato) =>
    contato.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <div className="w-full h-full">
      <form action="" className=" flex mt-[48px] justify-center">
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
            {filteredContacts.length} Contatos
          </span>
          <Link
            href="/novo"
            className="grid items-center border border-purple-950 rounded-lg hover:bg-purple-800 hover:text-white w-[150px] text-center text-purple-600 "
          >
            Novo Contato
          </Link>
        </div>
      </div>
      {filteredContacts.map((contato) => (
        <div
          key={contato.id}
          className="flex flex-col p-2 w-full border border-zinc-600 mt-[15px] rounded-2xl"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              <strong className="font-semibold">{contato.name}</strong>
              <small className="font-semibold text-purple-800">
                {contato.categoria.name}
              </small>
            </div>
            <div className="flex flex-row gap-3 justify-center items-center">
              <Link
                href={`/edit/${contato.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit size={20} />
              </Link>
              <button
                onClick={() => {
                  handleDeleteConfirm(contato.id, contato.name);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash size={20} />
              </button>
            </div>
          </div>
          <span className="text-zinc-500 font-light">{contato.email}</span>
          <span className="text-zinc-500 font-light">{contato.phone}</span>
        </div>
      ))}
    </div>
  );
}
