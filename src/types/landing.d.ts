declare module "landing" {
  interface Landing {
    advertisement: Advertisements[];
    loading: boolean;
    error: null | string;
  }
  interface Advertisements {
    id: number;
    title: string;
    details: string;
    image: string;
  }
}
