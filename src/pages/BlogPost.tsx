import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface BlogPostData {
  id: number;
  title: string;
  subtitle: string | null;
  content: string | null;
  published_date: string;
  reading_time: string | null;
  category?: string;
  image?: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const whatsappLink =
    "https://wa.me/556796938634?text=Olá,%20vim%20do%20Blog%20e%20gostaria%20de%20falar%20com%20um%20especialista.";

  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      try {
        // Corrigido: converter slug para número se necessário
        const postId = parseInt(slug, 10);

        if (isNaN(postId)) {
          console.error("ID inválido:", slug);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error("Erro ao carregar artigo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getCategoryColor = (category: string = "Geral") => {
    return category === "Trabalhista"
      ? "bg-gold/20 text-gold border-gold/30"
      : "bg-primary/20 text-primary border-primary/30";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32">
          <Loader2 className="animate-spin text-gold w-12 h-12" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-heading text-gold mb-6">
              Artigo não encontrado
            </h1>
            <Button
              onClick={() => navigate("/blog")}
              className="bg-gold hover:bg-gold/90 text-primary-foreground"
            >
              <ArrowLeft className="mr-2" size={20} /> Voltar para o Blog
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="pt-32 pb-20 px-6 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-8 text-gold hover:text-gold/80 hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2" size={20} /> Voltar para o Blog
          </Button>

          <article>
            <div className="mb-8">
              <span
                className={`inline-block text-sm font-medium px-4 py-2 rounded-full border ${getCategoryColor(
                  post.category || "Direito"
                )} mb-4`}
              >
                {post.category || "Direito"}
              </span>

              <h1 className="text-4xl md:text-5xl font-heading text-gold mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={18} /> {formatDate(post.published_date)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} /> {post.reading_time || "5 min"} de leitura
                </span>
              </div>
            </div>

            {/* CONTEÚDO DO ARTIGO COM FORMATAÇÃO CORRIGIDA */}
            <div className="bg-primary/10 rounded-lg border border-primary/20 p-8">
              <div
                className="blog-content text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: "1.75",
                }}
              />
            </div>

            <div className="mt-16 p-8 bg-navy-light rounded-lg border border-border text-center">
              <h3 className="text-2xl font-heading text-gold mb-4">
                Ficou com alguma dúvida?
              </h3>
              <p className="text-foreground/80 mb-6">
                Entre em contato conosco e receba orientação jurídica
                especializada.
              </p>
              <Button
                size="lg"
                onClick={() => window.open(whatsappLink, "_blank")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <MessageCircle className="mr-2" size={20} /> Falar com um
                Especialista
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
