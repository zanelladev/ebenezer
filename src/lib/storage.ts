import { createClient } from "@/lib/supabase/client"

/**
 * Upload a markdown file to Supabase Storage
 * @param file - The markdown content as string
 * @param type - 'events' or 'posts'
 * @param filename - The filename (without extension)
 * @returns The public URL of the uploaded file
 */
export async function uploadMarkdownFile(
  file: string,
  type: "events" | "posts",
  filename: string,
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = createClient()

  // Create a blob from the markdown string
  const blob = new Blob([file], { type: "text/markdown" })
  const filePath = `${type}/${filename}.md`

  const { error } = await supabase.storage.from("markdown-content").upload(filePath, blob, {
    cacheControl: "3600",
    upsert: true, // Overwrite if exists
  })

  if (error) {
    return { url: null, error }
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("markdown-content").getPublicUrl(filePath)

  return { url: urlData.publicUrl, error: null }
}

/**
 * Fetch markdown content from a URL
 * @param url - The URL of the markdown file
 * @returns The markdown content as string
 */
export async function fetchMarkdownContent(url: string): Promise<{ content: string | null; error: Error | null }> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch markdown content")
    }
    const content = await response.text()
    return { content, error: null }
  } catch (error) {
    return { content: null, error: error as Error }
  }
}

/**
 * Delete a markdown file from Supabase Storage
 * @param url - The public URL of the file to delete
 * @returns Success status
 */
export async function deleteMarkdownFile(url: string): Promise<{ success: boolean; error: Error | null }> {
  const supabase = createClient()

  // Extract the file path from the URL
  const urlParts = url.split("/markdown-content/")
  if (urlParts.length < 2) {
    return { success: false, error: new Error("Invalid URL format") }
  }

  const filePath = urlParts[1]

  const { error } = await supabase.storage.from("markdown-content").remove([filePath])

  if (error) {
    return { success: false, error }
  }

  return { success: true, error: null }
}

/**
 * Generate a unique filename based on title and timestamp
 * @param title - The title to generate filename from
 * @returns A URL-safe filename
 */
export function generateFilename(title: string): string {
  const timestamp = Date.now()
  const slug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens

  return `${slug}-${timestamp}`
}

/**
 * Upload an image file to Supabase Storage
 * @param file - The image file
 * @param type - 'events' or 'posts' or 'banners'
 * @param filename - The filename (with extension)
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
  file: File,
  type: "events" | "posts" | "banners",
  filename: string,
): Promise<{ url: string | null; error: Error | null }> {
  const supabase = createClient()

  const filePath = `images/${type}/${filename}`

  const { error } = await supabase.storage.from("markdown-content").upload(filePath, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    return { url: null, error }
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from("markdown-content").getPublicUrl(filePath)

  return { url: urlData.publicUrl, error: null }
}
