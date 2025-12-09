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
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      console.log("[v0] Original markdown:", value)
      const htmlContent = convertMarkdownToHTML(value)
      console.log("[v0] Converted to HTML:", htmlContent)
      editorRef.current.innerHTML = htmlContent
      setIsInitialized(true)
    }
  }, [value, isInitialized])

  const updateActiveFormats = () => {
    const formats = new Set<string>()

    if (document.queryCommandState("bold")) formats.add("bold")
    if (document.queryCommandState("italic")) formats.add("italic")
    if (document.queryCommandState("insertUnorderedList")) formats.add("bulletList")
    if (document.queryCommandState("insertOrderedList")) formats.add("orderedList")

    const selection = window.getSelection()
    if (selection && selection.anchorNode) {
      let node: Node | null = selection.anchorNode
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = (node as Element).tagName.toLowerCase()
          if (tagName === "h1") formats.add("h1")
          if (tagName === "h2") formats.add("h2")
          if (tagName === "h3") formats.add("h3")
        }
        node = node.parentNode
      }
    }

    setActiveFormats(formats)
  }

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      const markdown = convertHTMLToMarkdown(html)
      onChange(markdown)
    }
    updateActiveFormats()
  }

  useEffect(() => {
    const handleSelectionChange = () => {
      if (document.activeElement === editorRef.current || editorRef.current?.contains(document.activeElement)) {
        updateActiveFormats()
      }
    }

    document.addEventListener("selectionchange", handleSelectionChange)
    return () => document.removeEventListener("selectionchange", handleSelectionChange)
  }, [])

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
      formatKey: "bold",
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: "Italic",
      action: () => formatText("italic"),
      formatKey: "italic",
    },
    {
      icon: <Heading1 className="w-4 h-4" />,
      label: "Heading 1",
      action: () => insertHeading(1),
      formatKey: "h1",
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      label: "Heading 2",
      action: () => insertHeading(2),
      formatKey: "h2",
    },
    {
      icon: <Heading3 className="w-4 h-4" />,
      label: "Heading 3",
      action: () => insertHeading(3),
      formatKey: "h3",
    },
    {
      icon: <List className="w-4 h-4" />,
      label: "Bullet List",
      action: () => insertList(false),
      formatKey: "bulletList",
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      label: "Numbered List",
      action: () => insertList(true),
      formatKey: "orderedList",
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
            className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              button.formatKey && activeFormats.has(button.formatKey)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
            }`}
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
        div[contenteditable] ul {
          list-style-type: disc;
        }
        div[contenteditable] ol {
          list-style-type: decimal;
        }
        div[contenteditable] li {
          margin: 0.5em 0;
          display: list-item;
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

  console.log("[v0] Starting markdown conversion...")
  let html = markdown

  console.log("[v0] Before image conversion:", html)
  html = html.replace(
    /!\[([^\]]*)\]$$([^)]+)$$/g,
    '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" draggable="true" />',
  )
  console.log("[v0] After image conversion:", html)

  console.log("[v0] Before link conversion:", html)
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2">$1</a>')
  console.log("[v0] After link conversion:", html)

  html = html.replace(/^### (.*)$/gim, "<h3>$1</h3>")
  html = html.replace(/^## (.*)$/gim, "<h2>$1</h2>")
  html = html.replace(/^# (.*)$/gim, "<h1>$1</h1>")
  console.log("[v0] After heading conversion:", html)

  const lines = html.split("\n")
  let inList = false
  let listType = ""
  const processedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (trimmed.match(/^<(h[1-6]|img|a)/)) {
      if (inList) {
        processedLines.push(`</${listType}>`)
        inList = false
        listType = ""
      }
      processedLines.push(line)
      continue
    }

    if (trimmed.match(/^[-*] /)) {
      if (!inList || listType !== "ul") {
        if (inList) processedLines.push(`</${listType}>`)
        processedLines.push("<ul>")
        inList = true
        listType = "ul"
      }
      processedLines.push(`<li>${trimmed.substring(2)}</li>`)
    } else if (trimmed.match(/^\d+\. /)) {
      if (!inList || listType !== "ol") {
        if (inList) processedLines.push(`</${listType}>`)
        processedLines.push("<ol>")
        inList = true
        listType = "ol"
      }
      processedLines.push(`<li>${trimmed.replace(/^\d+\. /, "")}</li>`)
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`)
        inList = false
        listType = ""
      }
      processedLines.push(line)
    }
  }

  if (inList) {
    processedLines.push(`</${listType}>`)
  }

  html = processedLines.join("\n")

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>")

  html = html.replace(/\n\n/g, "</p><p>")
  html = html.replace(/\n/g, "<br />")

  if (!html.match(/^<(h[1-6]|ul|ol|img)/)) {
    html = "<p>" + html + "</p>"
  }

  html = html.replace(/<p>(<(?:h[1-6]|ul|ol|img)[^>]*>.*?<\/(?:h[1-6]|ul|ol)>)<\/p>/g, "$1")
  html = html.replace(/<p>(<img[^>]*>)<\/p>/g, "$1")

  console.log("[v0] Final HTML:", html)
  return html
}

function convertHTMLToMarkdown(html: string): string {
  let markdown = html

  markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, "# $1\n\n")
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n\n")
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, "### $1\n\n")

  markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, "**$1**")
  markdown = markdown.replace(/<b>(.*?)<\/b>/gi, "**$1**")

  markdown = markdown.replace(/<em>(.*?)<\/em>/gi, "*$1*")
  markdown = markdown.replace(/<i>(.*?)<\/i>/gi, "*$1*")

  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*>/gi, "![$2]($1)")
  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, "![Image]($1)")

  markdown = markdown.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")

  markdown = markdown.replace(/<ul>(.*?)<\/ul>/gis, (match, content) => {
    const items = content.match(/<li>(.*?)<\/li>/gi)
    if (!items) return match
    return (
      items
        .map((item: string) => {
          const text = item.replace(/<\/?li>/gi, "").trim()
          return `- ${text}`
        })
        .join("\n") + "\n\n"
    )
  })

  markdown = markdown.replace(/<ol>(.*?)<\/ol>/gis, (match, content) => {
    const items = content.match(/<li>(.*?)<\/li>/gi)
    if (!items) return match
    let counter = 1
    return (
      items
        .map((item: string) => {
          const text = item.replace(/<\/?li>/gi, "").trim()
          return `${counter++}. ${text}`
        })
        .join("\n") + "\n\n"
    )
  })

  markdown = markdown.replace(/<\/p><p>/gi, "\n\n")
  markdown = markdown.replace(/<p>/gi, "")
  markdown = markdown.replace(/<\/p>/gi, "\n\n")
  markdown = markdown.replace(/<br\s*\/?>/gi, "\n")
  markdown = markdown.replace(/<div>/gi, "")
  markdown = markdown.replace(/<\/div>/gi, "\n")

  markdown = markdown.replace(/\n{3,}/g, "\n\n")
  markdown = markdown.trim()

  return markdown
}
