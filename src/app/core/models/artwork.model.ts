export interface Artwork {
  id: string;

  title: string;
  year: number | null;
  medium: string | null;

  dimensions: string | null;
  price: number | null;
  imageUrl: string | null;
  description: string | null;

  artistId: string | null;
  exhibitionId: string | null;

  isFeatured: boolean;
}
