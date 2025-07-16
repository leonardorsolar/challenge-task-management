import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
};
