export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  author_name: string;
  author_avatar_url: string | null;
  category_id: string | null;
  tags: string[];
  published_at: string;
  reading_time_minutes: number;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  category?: BlogCategory;
}

export interface BlogWithCategory extends Blog {
  category: BlogCategory | null;
}

export interface BlogListParams {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  searchQuery?: string;
  sortBy?: 'published_at' | 'reading_time_minutes';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogListResponse {
  blogs: BlogWithCategory[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
