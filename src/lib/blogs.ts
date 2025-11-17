import { supabase } from './supabase';
import type { Blog, BlogWithCategory, BlogCategory, BlogListParams, BlogListResponse } from '../types/blog';

export async function getBlogBySlug(slug: string): Promise<BlogWithCategory | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching blog:', error);
      return null;
    }

    return data;
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
      .select(`
        *,
        category:blog_categories(*)
      `, { count: 'exact' })
      .eq('is_published', true)
      .order('is_featured', { ascending: false });

    if (categorySlug) {
      const { data: category } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', categorySlug)
        .maybeSingle();

      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    if (searchQuery) {
      query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
    }

    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

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
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured blogs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return [];
  }
}

export async function getCategoryWithCount(slug: string): Promise<{ category: BlogCategory | null; count: number }> {
  try {
    const { data: category } = await supabase
      .from('blog_categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!category) {
      return { category: null, count: 0 };
    }

    const { count } = await supabase
      .from('blogs')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', category.id)
      .eq('is_published', true);

    return { category, count: count || 0 };
  } catch (error) {
    console.error('Error fetching category with count:', error);
    return { category: null, count: 0 };
  }
}

export async function getRelatedBlogs(blog: Blog, limit: number = 3): Promise<BlogWithCategory[]> {
  try {
    let data: BlogWithCategory[] = [];

    // First, try to get blogs from the same category
    if (blog.category_id) {
      const { data: categoryBlogs, error } = await supabase
        .from('blogs')
        .select(`
          *,
          category:blog_categories(*)
        `)
        .eq('is_published', true)
        .eq('category_id', blog.category_id)
        .neq('id', blog.id)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (!error && categoryBlogs) {
        data = categoryBlogs;
      }
    }

    // If we don't have enough blogs, get recent blogs from any category
    if (data.length < limit) {
      const remaining = limit - data.length;
      const { data: recentBlogs, error } = await supabase
        .from('blogs')
        .select(`
          *,
          category:blog_categories(*)
        `)
        .eq('is_published', true)
        .neq('id', blog.id)
        .order('published_at', { ascending: false })
        .limit(remaining);

      if (!error && recentBlogs) {
        // Add recent blogs that aren't already in the data array
        const existingIds = new Set(data.map(b => b.id));
        const newBlogs = recentBlogs.filter(b => !existingIds.has(b.id));
        data = [...data, ...newBlogs];
      }
    }

    return data;
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
