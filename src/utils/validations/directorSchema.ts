import { z } from "zod";

export const directorSchema = z.object({
  description: z
    .string()
    .max(20, "A descrição não pode ter mais de 20 caracteres.")
    .nonempty("A descrição é obrigatória."),
  idUserResponsible: z.number().positive("O ID do usuário responsável deve ser um número positivo."),
});

export const defaultValuesDirectorSchema = {
  description: "",
  idUserResponsible: 0
}

export type directorSchema = z.infer<typeof directorSchema>;