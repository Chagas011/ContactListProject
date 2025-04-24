import { z } from "zod";
import { schemeFormContact } from "./scheme";

export type FormPropsContact = z.infer<typeof schemeFormContact>;
