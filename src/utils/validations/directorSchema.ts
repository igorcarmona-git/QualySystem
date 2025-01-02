import { z } from "zod";

export const directorSchema = z.object({
  descriptiion: z
    .string()
    .max(20, "A descrição não pode ter mais de 20 caracteres.")
    .nonempty("A descrição é obrigatória."),
  id_user_responsible: z.number().positive("O ID do usuário responsável deve ser um número positivo."),
});
