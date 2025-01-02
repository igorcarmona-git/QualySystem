import { useState } from "react";

/**
 * Hook genérico para gerenciar o estado de formulários.
 * 
 * @template T - O tipo genérico para representar os dados do formulário.
 * @param {T} initialState - O estado inicial do formulário.
 * @returns Um objeto contendo o estado do formulário (`formData`), uma função para atualizar o estado (`setFormData`),
 *          os erros do formulário (`errors`), uma função para atualizar os erros (`setErrors`),
 *          e uma função para lidar com alterações nos campos do formulário (`handleChange`).
 */
export function useForm<T extends Record<string, any>>(initialState: T) {
  // Estado que armazena os valores do formulário.
  const [formData, setFormData] = useState<T>(initialState);

  // Estado que armazena as mensagens de erro para os campos do formulário.
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Função para atualizar o valor de um campo específico no estado do formulário.
   * 
   * @param {keyof T} field - O nome do campo a ser atualizado.
   * @param {T[keyof T]} value - O novo valor do campo.
   */
  const handleChange = (field: keyof T, value: T[keyof T]) => {
    // Atualiza o valor do campo no estado `formData`.
    setFormData((prev) => ({
      ...prev, // Mantém os valores existentes no formulário.
      [field]: value, // Atualiza apenas o campo específico.
    }));

    // Limpa a mensagem de erro do campo que foi alterado.
    setErrors((prev) => ({
      ...prev, // Mantém os erros existentes.
      [field]: "", // Remove o erro associado ao campo atualizado.
    }));
  };

  // Retorna os estados e funções necessárias para o gerenciamento do formulário.
  return { formData, setFormData, errors, setErrors, handleChange };
}
