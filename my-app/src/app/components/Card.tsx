"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useContact } from "../hooks/useContact";
import { Contatos } from "../types/contact";

export interface CardProps {
  contatos: Contatos[];
}

export default function Card(props: CardProps) {
  const { handleDeleteConfirm } = useContact();
  return (
    <div className="w-full h-full">
      {props.contatos.map((contato) => (
        <div
          key={contato.id}
          className="flex flex-col p-2 w-full h-[90px] border border-zinc-600 mt-[15px] rounded-2xl"
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
