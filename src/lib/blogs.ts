import { supabase } from './supabase';
import type { Blog, BlogWithCategory, BlogCategory, BlogListParams, BlogListResponse } from '../types/blog';

export async function getBlogBySlug(slug: string): Promise<BlogWithCategory | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data as BlogWithCategory | null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function getPublishedBlogs(params: BlogListParams = {}): Promise<BlogListResponse> {
  try {
    const {
      page = 1,
      pageSize = 9,
      categorySlug,
      searchQuery,
      sortBy = 'published_at',
      sortOrder = 'desc'
    } = params;

    let query = supabase
      .from('blogs')
      .select('*', { count: 'exact' })
      .eq('is_published', true);

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    query = query
      .order('is_featured', { ascending: false })
      .order(sortBy, { ascending: sortOrder === 'asc' });

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching blogs:', error);
      return {
        blogs: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0
      };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      blogs: data || [],
      total,
      page,
      pageSize,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      blogs: [],
      total: 0,
      page: 1,
      pageSize: 9,
      totalPages: 0
    };
  }
}

export async function getFeaturedBlogs(limit: number = 3): Promise<BlogWithCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured blogs:', error);
      return [];
    }

    return (data || []) as BlogWithCategory[];
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  // Categories table doesn't exist yet, return empty array
  return [];
}

export async function getCategoryWithCount(slug: string): Promise<{ category: BlogCategory | null; count: number }> {
  // Categories table doesn't exist yet
  return { category: null, count: 0 };
}

export async function getRelatedBlogs(blog: Blog, limit: number = 3): Promise<BlogWithCategory[]> {
  try {
    // Get recent blogs excluding the current one
    const { data: recentBlogs, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .neq('id', blog.id)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related blogs:', error);
      return [];
    }

    return (recentBlogs || []) as BlogWithCategory[];
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
}

export function formatPublishedDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '< 1 min read';
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}
