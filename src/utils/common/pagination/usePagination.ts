import { useState } from 'react';

/**
 * Hook genérico para gerenciar paginação.
 * @template T - Tipo dos itens a serem paginados.
 * @param items - Lista de itens a serem paginados.
 * @param itemsPerPage - Quantidade de itens por página.
 * @returns Objeto com os itens paginados, a página atual, funções para mudar a página e a contagem total de páginas.
 */
export function usePagination<T>(items: T[], itemsPerPage: number) {
  // Define o estado da página atual, iniciando na página 1.
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o número total de páginas com base no tamanho da lista de itens e na quantidade de itens por página.
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Seleciona os itens da página atual, cortando a lista original com base nos índices calculados.
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage, // Índice inicial dos itens da página atual.
    currentPage * itemsPerPage       // Índice final dos itens da página atual.
  );

  /**
   * Atualiza o estado da página atual quando o usuário navega entre páginas.
   * @param _event - Evento de alteração, não utilizado (por isso o prefixo `_`).
   * @param newPage - Número da nova página selecionada.
   */
  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage); // Atualiza o estado da página atual.
  };

  // Retorna os valores necessários para gerenciar a paginação.
  return {
    currentItems,      // Itens da página atual.
    currentPage,       // Número da página atual.
    totalPages,        // Total de páginas calculado.
    setCurrentPage,    // Função para alterar manualmente a página atual.
    handlePageChange,  // Função de callback para controle de paginação.
  };
}
