import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostBySlug } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const whatsappLink = "https://wa.me/556796938634?text=Olá,%20vim%20do%20Blog%20e%20gostaria%20de%20falar%20com%20um%20especialista.";

  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-heading text-gold mb-6">
              Artigo não encontrado
            </h1>
            <p className="text-foreground/80 mb-8">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button
              onClick={() => navigate("/blog")}
              className="bg-gold hover:bg-gold/90 text-primary-foreground"
            >
              <ArrowLeft className="mr-2" size={20} />
              Voltar para o Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    return category === "Trabalhista" 
      ? "bg-gold/20 text-gold border-gold/30" 
      : "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-8 text-gold hover:text-gold/80 hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2" size={20} />
            Voltar para o Blog
          </Button>

          {/* Article Header */}
          <article>
            <div className="mb-8">
              <span className={`inline-block text-sm font-medium px-4 py-2 rounded-full border ${getCategoryColor(post.category)} mb-4`}>
                {post.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-heading text-gold mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {post.readTime} de leitura
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-invert prose-gold max-w-none
                prose-headings:font-heading prose-headings:text-gold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-foreground/80 prose-li:mb-2
                prose-strong:text-gold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-16 p-8 bg-navy-light rounded-lg border border-border text-center">
              <h3 className="text-2xl font-heading text-gold mb-4">
                Ficou com alguma dúvida?
              </h3>
              <p className="text-foreground/80 mb-6">
                Entre em contato conosco e receba orientação jurídica especializada.
              </p>
              <Button 
                size="lg"
                onClick={() => window.open(whatsappLink, '_blank')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <MessageCircle className="mr-2" size={20} />
                Falar com um Especialista
              </Button>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
