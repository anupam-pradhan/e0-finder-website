import Link from 'next/link'
import { Children, isValidElement, type ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function plainText(children: ReactNode): string {
  return Children.toArray(children).map((child): string =>
    isValidElement<{ children?: ReactNode }>(child)
      ? plainText(child.props.children)
      : String(child),
  ).join('')
}

function headingId(children: ReactNode) {
  return plainText(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function ArticleContent({ content }: { content: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      components={{
        h2: ({ children }) => <h2 id={headingId(children)} className="mb-4 mt-10 scroll-mt-24 border-b border-border pb-3 text-2xl font-bold">{children}</h2>,
        h3: ({ children }) => <h3 id={headingId(children)} className="mb-3 mt-8 scroll-mt-24 text-xl font-bold">{children}</h3>,
        h4: ({ children }) => <h4 id={headingId(children)} className="mb-2 mt-6 scroll-mt-24 text-lg font-bold">{children}</h4>,
        p: ({ children }) => <p className="my-4 break-words text-base leading-8 text-foreground/90">{children}</p>,
        strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
        ul: ({ children }) => <ul className="my-4 list-disc space-y-2 pl-6 text-base leading-7">{children}</ul>,
        ol: ({ children }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-base leading-7">{children}</ol>,
        li: ({ children }) => <li className="pl-1">{children}</li>,
        hr: () => <hr className="my-8 border-border" />,
        blockquote: ({ children }) => <blockquote className="my-6 border-l-4 border-primary pl-5 text-muted-foreground">{children}</blockquote>,
        code: ({ children }) => <code className="break-words rounded bg-muted px-1 py-0.5 text-sm">{children}</code>,
        table: ({ children }) => <div className="my-6 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[540px] border-collapse text-left text-sm leading-6">{children}</table></div>,
        thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
        th: ({ children }) => <th scope="col" className="border-b border-border px-4 py-3 align-top font-bold">{children}</th>,
        td: ({ children }) => <td className="border-b border-border px-4 py-3 align-top">{children}</td>,
        a: ({ href, children }) => href?.startsWith('/') && !href.startsWith('//')
          ? <Link href={href} className="break-words font-medium text-primary underline underline-offset-4">{children}</Link>
          : <a href={href} className="break-words font-medium text-primary underline underline-offset-4" rel="noreferrer" target="_blank">{children}</a>,
      }}
    >
      {content}
    </Markdown>
  )
}
