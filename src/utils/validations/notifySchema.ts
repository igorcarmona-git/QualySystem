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
    .nonempty("A hora de ocorrência é obrigatória.")
    .default("00:00"),
  typeNotify: z.string().toLowerCase().default(""),
  patientName: z.string().default(""),
  patientSex: z.string().default(""),
  patientRace: z.string().default(""),
  patientAge: z.string().default("0"),
  admissionDate: z
    .string()
    .refine(
      (value) => value <= today,
      { message: "A data de internação não pode ser maior que a data atual." }
    )
    .default(today),
  diagnostic: z.string().default(""),
  registerPatient: z.string().regex(/^[0-9]+$/, "O registro do paciente deve ser um número.").default("0"),
  eventType: z.string().default(""),
  damageDegree: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  sectorNotify: z.string().default(""),
  sectorNotified: z.string().default(""),
  involved: z.string().default(""),
  anonymous: z.string().default(""),
});

export type NotifySchema = z.infer<typeof notifySchema>;
