import { useForm } from "react-hook-form";
import { FormPropsContact } from "../types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemeFormContact } from "../types/scheme";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const useContact = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<FormPropsContact>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemeFormContact),
    defaultValues: {
      categoria: "INSTAGRAM",
      email: "",
      name: "",
      phone: "",
    },
  });
  const params = useParams();

  const handleFormSubmit = async (data: FormPropsContact) => {
    const { categoria, email, name, phone } = data;
    phone.replace(/\D/g, "");

    try {
      const response = await api.post("/contatos", {
        name,
        email,
        phone,
        categoria,
      });
      console.log(response);

      toast.success("Contato cadastrado com sucesso", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
      });
      reset();
      router.push("/");
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
      });
    }
  };

  const handleFormEdit = async (data: FormPropsContact) => {
    const { categoria, email, name, phone } = data;
    phone.replace(/\D/g, "");

    try {
      const response = await api.patch(`/contatos/${params.id}`, {
        name,
        email,
        categoria,
        phone,
      });

      toast.success(`Contato "${response.data.name}" Editado com sucesso`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
      });
      router.push("/");
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
      });
    }
  };

  const handleDeleteConfirm = (id: string, name: string) => {
    toast.warn(
      <div>
        <p className="text-red-600">
          {`Tem certeza que deseja remover o contato "${name}"?`}
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              onDelete(id);
              toast.dismiss();
            }}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Sim
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            Não
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };
  const onDelete = async (id: string) => {
    try {
      await api.delete(`/contatos/${id}`);
      toast.success("Contato removido", {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error(`${err}`, {
        position: "top-center",
        autoClose: 4000,
        closeOnClick: true,
        draggable: false,
        closeButton: true,
      });
    }
  };

  return {
    handleFormSubmit,
    handleSubmit,
    register,
    errors,
    handleFormEdit,
    handleDeleteConfirm,
    control,
    reset,
  };
};
