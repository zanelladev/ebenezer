"use client"

import type React from "react"

import { uploadImage } from "@/lib/storage"
import { Bold, Heading1, Heading2, Heading3, ImageIcon, Italic, List, ListOrdered, LinkIcon } from "lucide-react"
import { useRef, useState, useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  type: "events" | "posts"
}

export default function RichTextEditor({ value, onChange, type }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [uploading, setUploading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = convertMarkdownToHTML(value)
      setIsInitialized(true)
    }
  }, [value, isInitialized])

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      const markdown = convertHTMLToMarkdown(html)
      onChange(markdown)
    }
  }

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertHeading = (level: number) => {
    document.execCommand("formatBlock", false, `h${level}`)
    editorRef.current?.focus()
    handleInput()
  }

  const insertList = (ordered: boolean) => {
    formatText(ordered ? "insertOrderedList" : "insertUnorderedList")
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      formatText("createLink", url)
    }
  }

  const handleImageUpload = async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      setUploading(true)
      const filename = `${Date.now()}-${file.name}`
      const { url, error } = await uploadImage(file, type, filename)

      if (error || !url) {
        alert("Failed to upload image")
        setUploading(false)
        return
      }

      const imgHTML = `<img src="${url}" alt="Uploaded image" class="max-w-full h-auto rounded-lg my-4" draggable="true" />`
      document.execCommand("insertHTML", false, imgHTML)

      editorRef.current?.focus()
      handleInput()
      setUploading(false)
    }
    input.click()
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find((file) => file.type.startsWith("image/"))

    if (imageFile) {
      setUploading(true)
      const filename = `${Date.now()}-${imageFile.name}`
      const { url, error } = await uploadImage(imageFile, type, filename)

      if (error || !url) {
        alert("Failed to upload image")
        setUploading(false)
        return
      }

      const imgHTML = `<img src="${url}" alt="Uploaded image" class="max-w-full h-auto rounded-lg my-4" draggable="true" />`
      document.execCommand("insertHTML", false, imgHTML)

      handleInput()
      setUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const toolbarButtons = [
    {
      icon: <Bold className="w-4 h-4" />,
      label: "Bold",
      action: () => formatText("bold"),
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: "Italic",
      action: () => formatText("italic"),
    },
    {
      icon: <Heading1 className="w-4 h-4" />,
      label: "Heading 1",
      action: () => insertHeading(1),
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      label: "Heading 2",
      action: () => insertHeading(2),
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      label: "Heading 3",
      action: () => insertHeading(3),
    },
    {
      icon: <List className="w-4 h-4" />,
      label: "Bullet List",
      action: () => insertList(false),
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      label: "Numbered List",
      action: () => insertList(true),
    },
    {
      icon: <LinkIcon className="w-4 h-4" />,
      label: "Link",
      action: insertLink,
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      label: "Upload Image",
      action: handleImageUpload,
    },
  ]

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30">
        {toolbarButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            disabled={uploading}
            className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* WYSIWYG Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full px-4 py-3 bg-background text-foreground min-h-[400px] focus:outline-none"
        style={{
          overflowWrap: "break-word",
          lineHeight: "1.6",
        }}
      />

      {uploading && (
        <div className="p-2 text-sm text-muted-foreground text-center border-t border-border">Uploading image...</div>
      )}

      <style jsx>{`
        div[contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        div[contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        div[contenteditable] h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        div[contenteditable] p {
          margin: 1em 0;
        }
        div[contenteditable] ul,
        div[contenteditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        div[contenteditable] li {
          margin: 0.5em 0;
        }
        div[contenteditable] strong {
          font-weight: bold;
        }
        div[contenteditable] em {
          font-style: italic;
        }
        div[contenteditable] a {
          color: hsl(var(--primary));
          text-decoration: underline;
        }
        div[contenteditable] img {
          cursor: move;
        }
      `}</style>
    </div>
  )
}

function convertMarkdownToHTML(markdown: string): string {
  if (!markdown) return ""

  let html = markdown

  // Headers
  html = html.replace(/^### (.*)$/gim, "<h3>$1</h3>")
  html = html.replace(/^## (.*)$/gim, "<h2>$1</h2>")
  html = html.replace(/^# (.*)$/gim, "<h1>$1</h1>")

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")

  // Italic
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")

  // Images
  html = html.replace(
    /!\[([^\]]*)\]$$([^)]+)$$/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" draggable="true" />',
  )

  // Links
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2">$1</a>')

  // Lists
  html = html.replace(/^\* (.+)$/gim, "<li>$1</li>")
  html = html.replace(/^- (.+)$/gim, "<li>$1</li>")
  html = html.replace(/^\d+\. (.+)$/gim, "<li>$1</li>")

  // Line breaks
  html = html.replace(/\n\n/g, "</p><p>")
  html = html.replace(/\n/g, "<br />")

  if (!html.startsWith("<")) {
    html = "<p>" + html + "</p>"
  }

  return html
}

function convertHTMLToMarkdown(html: string): string {
  let markdown = html

  // Headers
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, "# $1\n\n")
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n\n")
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, "### $1\n\n")

  // Bold
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
  markdown = markdown.replace(/<b>(.*?)<\/b>/gi, "**$1**")

  // Italic
  markdown = markdown.replace(/<em>(.*?)<\/em>/gi, "*$1*")
  markdown = markdown.replace(/<i>(.*?)<\/i>/gi, "*$1*")

  // Images
  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)")
  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, "![Image]($1)")

  // Links
  markdown = markdown.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

  // Lists
  markdown = markdown.replace(/<ul>(.*?)<\/ul>/gis, (match, content) => {
    return content.replace(/<li>(.*?)<\/li>/gi, "- $1\n")
  })
  markdown = markdown.replace(/<ol>(.*?)<\/ol>/gis, (match, content) => {
    let counter = 1
    return content.replace(/<li>(.*?)<\/li>/gi, () => `${counter++}. $1\n`)
  })

  // Paragraphs and breaks
  markdown = markdown.replace(/<\/p><p>/gi, "\n\n")
  markdown = markdown.replace(/<p>/gi, "")
  markdown = markdown.replace(/<\/p>/gi, "\n\n")
  markdown = markdown.replace(/<br\s*\/?>/gi, "\n")
  markdown = markdown.replace(/<div>/gi, "")
  markdown = markdown.replace(/<\/div>/gi, "\n")

  // Clean up extra whitespace
  markdown = markdown.replace(/\n{3,}/g, "\n\n")
  markdown = markdown.trim()

  return markdown
}
