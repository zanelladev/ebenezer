/**
 * Image URLs Constants
 * 
 * Centralized location for all external image URLs used throughout the application.
 * Using CDN URLs for better performance and reliability.
 */

export const IMAGES = {
    // Hero Section
    hero: {
        main: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=1200&auto=format&fit=crop',
        fallback: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1200&auto=format&fit=crop',
    },

    // Event Placeholders
    events: {
        default: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=400&auto=format&fit=crop',
        worship: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400&auto=format&fit=crop',
        community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop',
    },

    // Blog Placeholders
    blog: {
        default: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop',
        spiritual: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=400&auto=format&fit=crop',
    },

    // About Section
    about: {
        church: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop',
        community: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop',
    },
} as const;

// Helper function to get optimized image URL with custom parameters
export function getOptimizedImageUrl(
    url: string,
    options?: {
        width?: number;
        height?: number;
        quality?: number;
        fit?: 'crop' | 'fill' | 'contain';
    }
): string {
    const { width, height, quality = 80, fit = 'crop' } = options || {};

    // Check if it's an Unsplash URL
    if (url.includes('unsplash.com')) {
        const params = new URLSearchParams();
        if (width) params.append('w', width.toString());
        if (height) params.append('h', height.toString());
        params.append('q', quality.toString());
        params.append('auto', 'format');
        params.append('fit', fit);

        return `${url.split('?')[0]}?${params.toString()}`;
    }

    return url;
}
