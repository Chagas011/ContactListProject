"use client";
import { Controller } from "react-hook-form";
import { useContact } from "../../hooks/useContact";
import Link from "next/link";
import { IMaskInput } from "react-imask";
import { useEffect, useState } from "react";
import { Categorias, Contatos } from "@/app/types/contact";
import { api } from "@/app/services/api";
import { useParams } from "next/navigation";

export default function EditContact() {
  const params = useParams();

  const { errors, handleFormEdit, register, handleSubmit, control, reset } =
    useContact();
  const [categorias, setCategorias] = useState<Categorias[]>([]);
  const [contato, setContato] = useState<Contatos>();

  useEffect(() => {
    const fetchContato = async () => {
      try {
        const { data } = await api.get(`/contatos/${params.id}`);
        setContato(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContato();
  }, [params.id]);
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const { data } = await api.get("/categorias");
        setCategorias(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategorias();
  }, []);
  useEffect(() => {
    if (contato) {
      reset({
        name: contato.name,
        email: contato.email,
        phone: contato.phone,
        categoria: contato.categoria.name,
      });
    }
  }, [contato, reset]);

  return (
    <div className="grid grid-rows-[1fr_1fr_20px] items-center justify-items-center min-h-screen p-8  gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[16px] row-start-1 items-center md:w-lg w-full">
        <Link href="/" className="flex flex-row">
          <h1 className="text-4xl">My</h1>
          <h1 className="text-purple-800 text-4xl font-semibold">Contacts</h1>
        </Link>

        <form
          onSubmit={handleSubmit(handleFormEdit)}
          className="grid mt-[58px]"
        >
          <h1 className="text-2xl text-center">Editar Contato</h1>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col mt-[28px] gap-2">
              <input
                {...register("name")}
                type="text"
                placeholder="Digite o nome do contato..."
                id="nome"
                className="border border-zinc-700 rounded-2xl p-2 md:w-96 w-80"
              />
              {errors.name?.message && (
                <p className="mb-2 text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-[28px] gap-2">
              <input
                {...register("email")}
                type="text"
                placeholder="Digite o email do contato..."
                id="email"
                className="border border-zinc-700 rounded-2xl p-2 md:w-96 w-80"
              />
              {errors.email?.message && (
                <p className="mb-2 text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-[28px] gap-2">
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{
                  required: "Telefone é obrigatório",
                  pattern: {
                    value: /\(\d{2}\) \d{5}-\d{4}/,
                    message: "Telefone inválido",
                  },
                }}
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="(00) 00000-0000"
                    type="text"
                    placeholder="Digite o telefone do contato..."
                    className="border border-zinc-700 rounded-2xl p-2 md:w-96 w-80"
                  />
                )}
              />
              {errors.phone?.message && (
                <p className="mb-2 text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col mt-[28px] gap-2">
              <select
                {...register("categoria")}
                id="categoria"
                className="border border-zinc-700 rounded-2xl p-2 md:w-96 w-80 bg-[#0a0a0a]"
              >
                {categorias.map((categoria) => (
                  <option
                    key={categoria.id}
                    value={categoria.name}
                    className="text-white bg-[#0a0a0a]"
                  >
                    {categoria.name}
                  </option>
                ))}
              </select>
              {errors.categoria?.message && (
                <p className="mb-2 text-red-500">{errors.categoria.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-row mt-[28px] gap-2 justify-center md:w-96 w-80">
            <button className=" bg-purple-800 text-white hover:bg-purple-600 active:bg-purple-900 w-full rounded-2xl p-2">
              Editar Contato
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
