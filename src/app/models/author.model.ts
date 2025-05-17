export interface Author {
  id?: number;
  name: string;
  books?: {
    id: number;
    title: string;
  }[];
}
