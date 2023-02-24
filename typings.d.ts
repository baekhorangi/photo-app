export interface Photo {
  alt_description: string;
  blur_hash: string;
  color: string;
  created_at: string;
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    download: string;
    download_location: string;
    html: string;
    self: string;
  };
  promoted_at: string;
  sponsporship: string | null;
  updated_at: string;
}
