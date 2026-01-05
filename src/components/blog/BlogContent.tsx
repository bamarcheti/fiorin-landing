import DOMPurify from "dompurify";

interface BlogContentProps {
  content: string;
  className?: string;
}

const BlogContent = ({ content, className = "" }: BlogContentProps) => {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "pre",
      "code",
      "hr",
      "span",
      "div",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
    ALLOW_DATA_ATTR: false,
  });

  // Processar o conteúdo para adicionar classes de indentação baseado em estrutura
  const processedContent = sanitizedContent.replace(
    /<li>(<strong>.*?<\/strong>)/g,
    '<li class="font-semibold">$1'
  );

  return (
    <div
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default BlogContent;
