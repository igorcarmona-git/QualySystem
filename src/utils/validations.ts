import { z } from "zod";

export const notifySchema = z.object({
  sectorNotify: z
    .string()
    .nonempty("O setor notificante é obrigatório.")
    .toLowerCase(),
  sectorNotified: z
    .string()
    .nonempty("O setor notificado é obrigatório.")
    .toLowerCase(),
  typeNotify: z
    .string()
    .nonempty("O tipo de notificação é obrigatório.")
    .toLowerCase(),
  description: z
    .string()
    .nonempty("A descrição é obrigatória.")
    .toLowerCase(),
  diagnostic: z
    .string()
    .nonempty("O diagnóstico é obrigatório.")
    .toLowerCase(),
  dateOccurrence: z
    .string()
    .nonempty("A data de ocorrência é obrigatória.")
    .date(),
  timeOccurrence: z
    .string()
    .nonempty("A hora de ocorrência é obrigatória.")
    .time(),
  patientName: z
    .string()
    .nonempty("O nome do paciente é obrigatório.")
    .toLowerCase(),
  patientSex: z
    .string()
    .nonempty("O sexo do paciente é obrigatório.")
    .toLowerCase(),
  patientRace: z
    .string()
    .nonempty("A raça/cor do paciente é obrigatória.")
    .toLowerCase(),
  patientAge: z
    .string()
    .nonempty("A idade do paciente é obrigatória."),
  admissionDate: z
    .string()
    .nonempty("A data de internação é obrigatória.")
    .date(),
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
  involved: z
    .string()
    .nonempty("A informação sobre envolvimento é obrigatória.")
    .toLowerCase(),
  anonymous: z
    .string()
    .nonempty("A escolha de anonimato é obrigatória.")
    .toLowerCase(),
  registerPatient: z
    .number()
    .min(1, "O registro do paciente é obrigatório e deve ser um número válido.")
});

export type NotifySchema = z.infer<typeof notifySchema>;