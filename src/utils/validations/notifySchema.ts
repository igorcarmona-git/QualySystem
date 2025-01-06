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
    )
    .default(today),
  timeOccurrence: z
    .string()
    .nonempty("A hora de ocorrência é obrigatória."),
  typeNotify: z.string().nonempty("O tipo de notificação é obrigatório."),
  patientName: z.string().nonempty("O nome do paciente é obrigatório."),
  patientSex: z.string().nonempty("O sexo do paciente é obrigatório."),
  patientRace: z.string().optional(),
  patientAge: z.string().optional(),
  admissionDate: z
    .string()
    .nonempty("A data de internação é obrigatória.")
    .refine(
      (value) => value <= today,
      { message: "A data de internação não pode ser maior que a data atual." }
    )
    .default(today),
  diagnostic: z.string().nonempty("O diagnóstico é obrigatório."),
  registerPatient: z.string().regex(/^[0-9]+$/, "O registro do paciente deve ser um número.").default("0"),
  eventType: z.string().nonempty("O tipo de evento é obrigatório."),
  damageDegree: z.string().optional(),
  title: z.string().nonempty("O título é obrigatório."),
  description: z.string().nonempty("A descrição é obrigatória."),
  sectorNotify: z.number().int().nonnegative("O setor notificante é obrigatório."),
  sectorNotified: z.number().int().nonnegative("O setor notificado é obrigatório."),
  involved: z.string(),
  anonymous: z.string(),
});

export type NotifySchema = z.infer<typeof notifySchema>;
