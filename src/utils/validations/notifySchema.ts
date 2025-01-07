import { z } from "zod";

// Obtém a data atual no formato "YYYY-MM-DD"
const today = new Date().toISOString().split("T")[0];

export const notifySchema = z.object({
  dateOccurrence: z.string().min(1, "A data de ocorrência é obrigatória.")
    .refine(
      (value) => value <= today,
      { message: "A data de ocorrência nao pode ser maior que a data atual." }
    ),
  timeOccurrence: z.string().min(1, "A hora de ocorrência é obrigatória."),
  typeNotify: z.string().min(1, "O tipo de notificação é obrigatório."),
  patientName: z.string().min(1, "O nome do paciente é obrigatório."),
  patientSex: z.string().min(1, "O sexo do paciente é obrigatório."),
  patientRace: z.string().optional(),
  patientAge: z.string().optional(),
  admissionDate: z
    .string()
    .min(1, "A data de internação é obrigatória.")
    .refine(
      (value) => value <= today,
      { message: "A data de internação não pode ser maior que a data atual." }
    ),
  diagnostic: z.string().min(1, "O diagnóstico é obrigatório."),
  registerPatient: z.string().regex(/^[0-9]+$/, "O registro do paciente deve ser um número.").default("0"),
  eventType: z.string().min(1, "O tipo de evento é obrigatório."),
  damageDegree: z.string().optional(),
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  sectorNotify: z.number().min(1, "O setor notificador é obrigatório."),
  sectorNotified: z.number().min(1, "O setor notificado é obrigatório."),
  involved: z.string().min(1, "O campo de envolvimento é obrigatório."),
  anonymous: z.string().min(1, "O campo de anonimato é obrigatório."),
});

export type NotifySchema = z.infer<typeof notifySchema>;

export const defaultValuesNotifySchema: NotifySchema = {
  dateOccurrence: today,
  timeOccurrence: "00:00",
  typeNotify: "",
  patientName: "",
  patientSex: "",
  patientRace: "",
  patientAge: "",
  admissionDate: today,
  diagnostic: "",
  registerPatient: "0",
  eventType: "",
  damageDegree: "",
  title: "",
  description: "",
  sectorNotify: 0,
  sectorNotified: 0,
  involved: "no",
  anonymous: "no",  
};
