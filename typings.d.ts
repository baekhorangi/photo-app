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
  user: User;
}

export interface User {
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
}
