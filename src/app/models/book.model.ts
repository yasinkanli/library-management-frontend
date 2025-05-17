export interface Book {
  id?: number;
  title: string;
  authorIds?: number[];
  authors?: {
    id: number;
    name: string;
  }[];
}
