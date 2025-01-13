import { z } from "zod";

export const loginSchema = z.object({
    user: z.string()
        .min(1, "O usuário é obrigatório.")
        .trim(),
    password: z.
        string()
        .min(6, "A senha deve ter no mínimo 6 caracteres.")
        .trim()
}) 

export const defaultValuesLoginSchema = {
    user: "",
    password: ""
}

export type LoginSchema = z.infer<typeof loginSchema>