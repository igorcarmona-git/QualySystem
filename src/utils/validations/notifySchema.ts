import { z } from "zod";

// Obtém a data atual no formato "YYYY-MM-DD"
const today = new Date().toISOString().split("T")[0];

export const notifySchema = z.object({
  dateOccurrence: z
    .string()
    .nonempty("A data de ocorrência é obrigatória.")
    .refine(
      (value) => value <= today,
      { message: "A data de ocorrência nao pode ser maior que a data atual." }
    ),
  timeOccurrence: z
    .string()
    .nonempty("A hora de ocorrência é obrigatória."),
  typeNotify: z
    .string()
    .nonempty("O tipo de notificação é obrigatório.")
    .toLowerCase(),
  patientName: z
    .string()
    .min(10, "Digite o nome completo do paciente")
    .nonempty("O nome do paciente é obrigatório.")
    .toLowerCase(),
  patientSex: z
    .string()
    .nonempty("O sexo do paciente é obrigatório.")
    .toLowerCase(),
  patientRace: z
    .string()
    .toLowerCase(),
  patientAge: z
    .string()
    .nonempty("A idade do paciente é obrigatória."),
  admissionDate: z
    .string()
    .refine(
      (value) => value <= today,
      { message: "A data de internação não pode ser maior que a data atual." }
    ),
  diagnostic: z
    .string()
    .nonempty("O diagnóstico é obrigatório.")
    .toLowerCase(),
  registerPatient: z
    .string()
    .min(1, "O registro do paciente é obrigatório e deve ser um número válido.")
    .regex(/^[0-9]+$/, "O registro do paciente deve ser um número."),
  eventType: z
    .string()
    .nonempty("O tipo de evento é obrigatório."),
  damageDegree: z
    .string()
    .nonempty("O grau do dano é obrigatório.")
    .toLowerCase(),
  title: z
    .string()
    .nonempty("O título é obrigatório.")
    .toLowerCase(),
  description: z
    .string()
    .nonempty("A descrição é obrigatória.")
    .toLowerCase(),
  sectorNotify: z
    .string()
    .nonempty("O setor notificante é obrigatório.")
    .toLowerCase(),
  sectorNotified: z
    .string()
    .nonempty("O setor notificado é obrigatório.")
    .toLowerCase(),
  involved: z
    .string()
    .toLowerCase()
    .nonempty("O campo de envolvimento é obrigatório."),
  anonymous: z
    .string()
    .toLowerCase()
    .nonempty("O campo de anonimato é obrigatório."),
});

export type NotifySchema = z.infer<typeof notifySchema>;
