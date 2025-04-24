import { z } from "zod";

export const schemeFormContact = z.object({
  name: z.string().min(1, "Campo obrigatorio"),
  email: z.string().email("Email invalido").min(1, "Campo obrigatorio"),
  phone: z.string().min(1, "Campo obrigatorio"),
  categoria: z.string(),
});
