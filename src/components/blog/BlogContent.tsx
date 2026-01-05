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

  return (
    <div
      className={`blog-content prose prose-sm sm:prose-base max-w-none text-foreground leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      style={{
        fontSize: "1.0625rem",
        lineHeight: "1.75",
      }}
    />
  );
};

export default BlogContent;
