"use client"

import { RichTextEditorResources } from "@/lib/resources"
import { uploadImage } from "@/lib/storage"
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Edit2, Heading1, Heading2, Heading3, ImageIcon, Italic, LinkIcon, List, ListOrdered, Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  type: "events" | "posts"
}

export default function RichTextEditor({ value, onChange, type }: RichTextEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [, setEditorUpdate] = useState(0)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [isEditingLink, setIsEditingLink] = useState(false)
  const [showLinkBubble, setShowLinkBubble] = useState(false)
  const [showImageBubble, setShowImageBubble] = useState(false)
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 })
  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
        inline: false,
      }),
      Placeholder.configure({
        placeholder: 'Write something...',
      }),
    ],
    content: convertMarkdownToHTML(value),
    onUpdate: ({ editor }) => {
      const markdown = convertHTMLToMarkdown(editor.getHTML())
      onChange(markdown)
    },
    onSelectionUpdate: () => {
      // Force re-render to update button states
      setEditorUpdate(prev => prev + 1)
    },
  })

  // Listen to transaction updates for reliable state changes
  useEffect(() => {
    if (!editor) return

    const handler = () => {
      setEditorUpdate(prev => prev + 1)

      // Check if link is active
      if (editor.isActive('link')) {
        const { view } = editor
        const { from } = view.state.selection
        const start = view.coordsAtPos(from)

        if (editorRef.current) {
          const editorRect = editorRef.current.getBoundingClientRect()
          setBubblePosition({
            top: start.top - editorRect.top - 50,
            left: start.left - editorRect.left
          })
          setShowLinkBubble(true)
          setShowImageBubble(false)
        }
      }
      // Check if image is selected
      else {
        const selection = editor.state.selection as { node?: { type: { name: string } } }
        if (selection.node && selection.node.type.name === 'image') {
          const { view } = editor
          const { from } = view.state.selection
          const start = view.coordsAtPos(from)

          if (editorRef.current) {
            const editorRect = editorRef.current.getBoundingClientRect()
            setBubblePosition({
              top: start.top - editorRect.top - 50,
              left: start.left - editorRect.left
            })
            setShowImageBubble(true)
            setShowLinkBubble(false)
          }
        } else {
          setShowLinkBubble(false)
          setShowImageBubble(false)
        }
      }
    }

    editor.on('transaction', handler)
    editor.on('selectionUpdate', handler)

    return () => {
      editor.off('transaction', handler)
      editor.off('selectionUpdate', handler)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const setLink = () => {
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, '')
    const previousUrl = editor.getAttributes('link').href || ''

    setLinkText(text)
    setLinkUrl(previousUrl)
    setIsEditingLink(!!previousUrl)
    setShowLinkDialog(true)
  }

  const editLink = () => {
    const previousUrl = editor.getAttributes('link').href || ''
    const { from, to } = editor.state.selection
    const text = editor.state.doc.textBetween(from, to, '')

    setLinkText(text)
    setLinkUrl(previousUrl)
    setIsEditingLink(true)
    setShowLinkDialog(true)
  }

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
  }

  const handleLinkSubmit = () => {
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
    }
    setShowLinkDialog(false)
    setLinkUrl('')
    setLinkText('')
    setIsEditingLink(false)
  }

  const addImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      setUploading(true)
      const filename = `${Date.now()}-${file.name}`
      const { url, error } = await uploadImage(file, type, filename)

      if (error || !url) {
        alert('Falha ao fazer upload da imagem')
        setUploading(false)
        return
      }

      editor.chain().focus().setImage({ src: url, alt: 'Imagem' }).run()
      setUploading(false)
    }
    input.click()
  }

  const replaceSelectedImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      setUploading(true)
      const filename = `${Date.now()}-${file.name}`
      const { url, error } = await uploadImage(file, type, filename)

      if (error || !url) {
        alert('Falha ao fazer upload da imagem')
        setUploading(false)
        return
      }

      // Update the selected image
      editor.chain().focus().setImage({ src: url, alt: 'Imagem' }).run()
      setUploading(false)
    }
    input.click()
  }

  return (
    <div ref={editorRef} className="border border-border rounded-xl overflow-hidden bg-background relative">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${editor.isActive('bold') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${editor.isActive('italic') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title={RichTextEditorResources.toolbar.bulletList}
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title={RichTextEditorResources.toolbar.orderedList}
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded-lg transition-colors ${editor.isActive('link') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
            }`}
          title={RichTextEditorResources.toolbar.link}
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={addImage}
          disabled={uploading}
          className="p-2 rounded-lg transition-colors hover:bg-accent disabled:opacity-50"
          title={RichTextEditorResources.toolbar.image}
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} className="prose prose-sm max-w-none" />

      {/* Floating menu for links */}
      {showLinkBubble && (
        <div
          className="absolute z-10 flex items-center gap-1 bg-background border border-border rounded-lg shadow-lg p-1"
          style={{
            top: `${bubblePosition.top}px`,
            left: `${bubblePosition.left}px`,
          }}
        >
          <button
            type="button"
            onClick={editLink}
            className="p-2 rounded hover:bg-accent transition-colors"
            title={RichTextEditorResources.bubbleMenu.editLink}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={removeLink}
            className="p-2 rounded hover:bg-accent text-destructive transition-colors"
            title={RichTextEditorResources.bubbleMenu.removeLink}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating menu for images */}
      {showImageBubble && (
        <div
          className="absolute z-10 flex items-center gap-1 bg-background border border-border rounded-lg shadow-lg p-1"
          style={{
            top: `${bubblePosition.top}px`,
            left: `${bubblePosition.left}px`,
          }}
        >
          <button
            type="button"
            onClick={replaceSelectedImage}
            className="p-2 rounded hover:bg-accent transition-colors"
            title={RichTextEditorResources.bubbleMenu.editImage}
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.chain().focus().deleteSelection().run()
              setShowImageBubble(false)
            }}
            className="p-2 rounded hover:bg-accent text-destructive transition-colors"
            title={RichTextEditorResources.bubbleMenu.removeImage}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {uploading && (
        <div className="p-2 text-sm text-muted-foreground text-center border-t border-border">
          {RichTextEditorResources.dialogs.image.uploading}
        </div>
      )}

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowLinkDialog(false)}>
          <div className="bg-background border border-border rounded-xl p-6 w-full max-w-md shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4">
              {isEditingLink ? RichTextEditorResources.dialogs.link.title : RichTextEditorResources.dialogs.link.title}
            </h3>

            {linkText && (
              <div className="mb-4">
                <label className="text-sm text-muted-foreground block mb-2">
                  {RichTextEditorResources.dialogs.link.textLabel}
                </label>
                <div className="px-3 py-2 bg-muted rounded-lg text-sm">{linkText}</div>
              </div>
            )}

            <div className="mb-4">
              <label className="text-sm font-medium block mb-2">
                {RichTextEditorResources.dialogs.link.urlLabel}
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder={RichTextEditorResources.dialogs.link.urlPlaceholder}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLinkSubmit()
                  } else if (e.key === 'Escape') {
                    setShowLinkDialog(false)
                  }
                }}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowLinkDialog(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
              >
                {RichTextEditorResources.dialogs.link.cancel}
              </button>
              <button
                type="button"
                onClick={handleLinkSubmit}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {linkUrl
                  ? (isEditingLink
                    ? RichTextEditorResources.dialogs.link.update
                    : RichTextEditorResources.dialogs.link.insert)
                  : RichTextEditorResources.dialogs.link.remove}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .ProseMirror {
          min-height: 400px;
          padding: 1rem;
          outline: none;
        }
        
        .ProseMirror p.is-editor-empty:first-child::before {
          color: hsl(var(--muted-foreground));
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        
        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          line-height: 1.2;
        }
        
        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          line-height: 1.3;
        }
        
        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
          line-height: 1.4;
        }
        
        .ProseMirror p {
          margin: 1em 0;
          line-height: 1.6;
        }
        
        .ProseMirror ul,
        .ProseMirror ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .ProseMirror ul {
          list-style-type: disc;
        }
        
        .ProseMirror ol {
          list-style-type: decimal;
        }
        
        .ProseMirror li {
          margin: 0.5em 0;
        }
        
        .ProseMirror strong {
          font-weight: bold;
        }
        
        .ProseMirror em {
          font-style: italic;
        }
        
        .ProseMirror a {
          color: hsl(var(--primary));
          text-decoration: underline;
          cursor: pointer;
        }
        
        .ProseMirror a:hover {
          opacity: 0.8;
        }
        
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
          display: block;
          cursor: pointer;
          transition: opacity 0.2s;
          position: relative;
        }
        
        .ProseMirror img:hover {
          opacity: 0.9;
        }
        
        .ProseMirror .ProseMirror-selectednode {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
        }
        
        .ProseMirror code {
          background-color: hsl(var(--muted));
          padding: 0.2em 0.4em;
          border-radius: 0.25rem;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  )
}

// Convert markdown to HTML for Tiptap
function convertMarkdownToHTML(markdown: string): string {
  if (!markdown) return '<p></p>'

  let html = markdown

  // Clean up any leftover HTML artifacts
  html = html.replace(/<ul><\/ul>/g, '')
  html = html.replace(/<ol><\/ol>/g, '')

  // Convert bold and italic before other processing
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Convert headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Process lists line by line
  const lines = html.split('\n')
  const processed: string[] = []
  let inUL = false
  let inOL = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Bullet list
    if (line.match(/^[-*]\s+(.+)/)) {
      if (!inUL) {
        if (inOL) {
          processed.push('</ol>')
          inOL = false
        }
        processed.push('<ul>')
        inUL = true
      }
      processed.push(`<li>${line.replace(/^[-*]\s+/, '')}</li>`)
    }
    // Ordered list
    else if (line.match(/^\d+\.\s+(.+)/)) {
      if (!inOL) {
        if (inUL) {
          processed.push('</ul>')
          inUL = false
        }
        processed.push('<ol>')
        inOL = true
      }
      processed.push(`<li>${line.replace(/^\d+\.\s+/, '')}</li>`)
    }
    // Not a list
    else {
      if (inUL) {
        processed.push('</ul>')
        inUL = false
      }
      if (inOL) {
        processed.push('</ol>')
        inOL = false
      }

      if (line.length > 0) {
        // Don't wrap headings and images in paragraphs
        if (!line.match(/^<(h[1-6]|img)/)) {
          processed.push(`<p>${line}</p>`)
        } else {
          processed.push(line)
        }
      }
    }
  }

  // Close any open lists
  if (inUL) processed.push('</ul>')
  if (inOL) processed.push('</ol>')

  return processed.join('')
}

// Convert Tiptap HTML to markdown
function convertHTMLToMarkdown(html: string): string {
  let markdown = html

  // Convert headings
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')

  // Convert strong and em
  markdown = markdown.replace(/<strong><em>(.*?)<\/em><\/strong>/gi, '***$1***')
  markdown = markdown.replace(/<em><strong>(.*?)<\/strong><\/em>/gi, '***$1***')
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
  markdown = markdown.replace(/<b>(.*?)<\/b>/gi, '**$1**')
  markdown = markdown.replace(/<em>(.*?)<\/em>/gi, '*$1*')
  markdown = markdown.replace(/<i>(.*?)<\/i>/gi, '*$1*')

  // Convert links
  markdown = markdown.replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')

  // Convert images
  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
  markdown = markdown.replace(/<img[^>]+src="([^"]+)"[^>]*\/?>/gi, '![Image]($1)')

  // Convert unordered lists
  markdown = markdown.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    const items = content.match(/<li[^>]*>(.*?)<\/li>/gi)
    if (!items) return ''
    return items
      .map((item: string) => {
        const text = item.replace(/<\/?li[^>]*>/gi, '').replace(/<br\s*\/?>/gi, '\n').trim()
        return `- ${text}`
      })
      .join('\n') + '\n\n'
  })

  // Convert ordered lists
  markdown = markdown.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content) => {
    const items = content.match(/<li[^>]*>(.*?)<\/li>/gi)
    if (!items) return ''
    let counter = 1
    return items
      .map((item: string) => {
        const text = item.replace(/<\/?li[^>]*>/gi, '').replace(/<br\s*\/?>/gi, '\n').trim()
        return `${counter++}. ${text}`
      })
      .join('\n') + '\n\n'
  })

  // Convert paragraphs
  markdown = markdown.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')

  // Convert breaks
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n')

  // Clean up extra whitespace
  markdown = markdown.replace(/\n{3,}/g, '\n\n')
  markdown = markdown.trim()

  return markdown
}
