import { supabase } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';

export function getStorageUrl(bucketName: string, path: string): string {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${SUPABASE_URL}/storage/v1/object/public/${bucketName}/${cleanPath}`;
}

export function getMediaUrl(path: string): string {
  return getStorageUrl('media', path);
}

export function extractFilenameFromUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const parts = pathname.split('/');
    return parts[parts.length - 1] || '';
  } catch {
    return url.split('/').pop() || '';
  }
}

export function validateImageUrl(url: string): boolean {
  if (!url) return false;

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const lowerUrl = url.toLowerCase();

  return imageExtensions.some(ext => lowerUrl.includes(ext));
}

export async function uploadImage(
  file: File,
  path: string
): Promise<{ url: string; error: string | null }> {
  try {
    if (!file) {
      return { url: '', error: 'No file provided' };
    }

    if (!validateImageUrl(file.name)) {
      return { url: '', error: 'Invalid image file type' };
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      return { url: '', error: uploadError.message };
    }

    const url = getMediaUrl(filePath);
    return { url, error: null };
  } catch (error) {
    return {
      url: '',
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

export async function deleteFile(path: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.storage
      .from('media')
      .remove([path]);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Delete failed'
    };
  }
}
