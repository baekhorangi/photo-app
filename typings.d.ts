export interface Photo {
  alt_description: string;
  id: string;
  likes: number;
  links: {
    download: string;
  };
  urls: {
    regular: string;
    small: string;
    full: string;
  };
}
