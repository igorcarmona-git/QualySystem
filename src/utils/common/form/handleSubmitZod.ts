import { z } from "zod";

/**
 * Função genérica para validar dados de formulário usando o Zod e lidar com erros de validação.
 * 
 * @template T - O tipo dos dados que estão sendo validados.
 * @param {z.ZodSchema<T>} schema - O esquema Zod que define as regras de validação.
 * @param {T} formData - Os dados do formulário que precisam ser validados.
 * @param {(errors: Record<string, string>) => void} setErrors - Função para atualizar os erros do formulário.
 * @returns {T | undefined} - Retorna os dados validados se forem válidos, ou `undefined` se ocorrerem erros.
 */
export function handleSubmitZod<T>(
  schema: z.ZodSchema<T>, // Esquema de validação definido com Zod.
  formData: T, // Dados que precisam ser validados.
  setErrors: (errors: Record<string, string>) => void // Função para registrar os erros de validação.
) {
  try {
    // Tenta validar os dados usando o esquema Zod fornecido.
    const validation = schema.parse(formData);

    // Log dos dados válidos (opcional, para depuração).
    console.log("Dados válidos:", validation);

    // Retorna os dados validados para uso posterior.
    return validation;
  } catch (error) {
    // Verifica se o erro é uma instância de `ZodError`.
    if (error instanceof z.ZodError) {
      // Objeto para armazenar mensagens de erro associadas a cada campo.
      const validationErrors: Record<string, string> = {};
      console.error("Erros de validação:", error);

      // Itera sobre as questões de validação para mapear mensagens de erro.
      error.issues.forEach((issue) => {
        if (issue.path[0]) {
          // Usa o caminho do campo (`path[0]`) como chave e a mensagem do erro como valor.
          validationErrors[issue.path[0] as string] = issue.message;
        }
      });

      // Atualiza os erros no estado do formulário usando `setErrors`.
      setErrors(validationErrors);
    }
  }
}
