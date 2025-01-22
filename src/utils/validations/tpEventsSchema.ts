import { z } from "zod";


export const tpEventsSchema = z.object({

  codigoTpNotificacao: z.string()
  .min(1, "O registro do paciente é obrigatório."),

  tituloTpNotificacao: z.string(),

  descTipo: z.string(),

  gestor: z.number(),
 
});

export type tpEventsSchema = z.infer<typeof tpEventsSchema>;

export const defaultValuesTpEventsSchema: tpEventsSchema = {
  codigoTpNotificacao: "",
  tituloTpNotificacao: "",
  descTipo: "",
  gestor: 0,
};
