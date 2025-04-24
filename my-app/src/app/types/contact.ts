export interface Categorias {
  id: string;
  name: string;
}

export interface Contatos {
  id: string;
  name: string;
  email: string;
  phone: string;
  categoria: Categorias;
}
