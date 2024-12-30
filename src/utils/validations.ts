import { z } from "zod";

export const notifySchema = z.object({
  sectorNotify: z
    .string()
    .nonempty("O setor notificante é obrigatório."),
  sectorNotified: z
    .string()
    .nonempty("O setor notificado é obrigatório."),
  typeNotify: z
    .string()
    .nonempty("O tipo de notificação é obrigatório."),
  description: z
    .string()
    .nonempty("A descrição é obrigatória.")
    .toLowerCase(),
  diagnostic: z
    .string()
    .nonempty("O diagnóstico é obrigatório."),
  dateOccurrence: z
    .string()
    .nonempty("A data de ocorrência é obrigatória.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "A data deve estar no formato yyyy-mm-dd."),
  timeOccurrence: z
    .string()
    .nonempty("A hora de ocorrência é obrigatória.")
    .regex(/^\d{2}:\d{2}$/, "A hora deve estar no formato hh:mm."),
  patientName: z
    .string()
    .nonempty("O nome do paciente é obrigatório.")
    .toLowerCase(),
  patientSex: z
    .string()
    .nonempty("O sexo do paciente é obrigatório."),
  patientRace: z
    .string()
    .nonempty("A raça/cor do paciente é obrigatória."),
  patientAge: z
    .string()
    .nonempty("A idade do paciente é obrigatória.")
    .regex(/^\d+$/, "A idade deve ser um número."),
  admissionDate: z
    .string()
    .nonempty("A data de internação é obrigatória.")
    .regex(/^\d{2}-\d{2}-\d{4}$/, "A data de internação deve estar no formato dd-mm-aaaa."),
  eventType: z
    .string()
    .nonempty("O tipo de evento é obrigatório."),
  damageDegree: z
    .string()
    .nonempty("O grau do dano é obrigatório."),
  title: z
    .string()
    .nonempty("O título é obrigatório."),
  involved: z
    .string()
    .nonempty("A informação sobre envolvimento é obrigatória."),
  anonymous: z
    .string()
    .nonempty("A escolha de anonimato é obrigatória."),
  registerPatient: z
    .number()
    .min(1, "O registro do paciente é obrigatório e deve ser um número válido."),
});

export type NotifySchema = z.infer<typeof notifySchema>;