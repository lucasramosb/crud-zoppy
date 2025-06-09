export interface Client {
  id: string;
  name: string;
  email: string;
  telephone: string;
  address?: string;
  cpf_cnpj: string;
  birthdate?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
