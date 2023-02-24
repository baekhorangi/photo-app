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
  tags: Tag[];
  views: number;
}

export interface User {
  name: string;
  username: string;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  bio: string;
  social: {
    instagram_username: string;
  };
  downloads: number;
  followers_count: number;
  following_count: number;
}

export interface CollectionInfo {
  title: string;
  user: User;
  tags: Tag[];
  id: string;
  cover_photo: {
    urls: {
      regular: string;
      small: string;
      full: string;
    };
  };
  total_photos: number;
}

export interface Tag {
  title: string;
}
