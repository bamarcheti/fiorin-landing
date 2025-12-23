import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  subtitle: string | null;
  content: string | null;
  published_date: string;
  reading_time: string | null;
  category?: string;
  image?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os posts do Supabase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("published_date", { ascending: false }); // Ordena do mais recente para o mais antigo

        if (error) throw error;

        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getCategoryColor = (category: string) => {
    return category === "Trabalhista"
      ? "bg-gold/20 text-gold border-gold/30"
      : "bg-primary/20 text-primary border-primary/30";
  };

  // Função auxiliar para formatar a data (YYYY-MM-DD -> DD/MM/YYYY)
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Blog Jurídico - Artigos sobre Direito Trabalhista e Previdenciário"
        description="Confira artigos e informações atualizadas sobre Direito Trabalhista e Previdenciário. Entenda seus direitos com a Fiorin Advocacia."
        canonical="https://fiorinadvocacia.com.br/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog Fiorin Advocacia",
          description: "Artigos sobre Direito Trabalhista e Previdenciário",
          url: "https://fiorinadvocacia.com.br/blog",
          publisher: {
            "@type": "LegalService",
            name: "Fiorin Advocacia",
          },
        }}
      />
      <Navbar />

      <main className="pt-32 pb-20 px-6 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-heading text-gold mb-6">
              Blog
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Veja nossos conteúdos, e entenda melhor seus direitos e como
              podemos ajudá-lo!
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-gold w-12 h-12" />
            </div>
          ) : (
            /* Blog Posts Grid */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`} // O ID agora virá do banco (ex: 1, 2, 3)
                  className="group"
                >
                  <Card className="bg-card border-border overflow-hidden h-full hover:border-gold/50 transition-all duration-300 flex flex-col">
                    {/* Post Image - Usando placeholder se não houver imagem no banco */}
                    {/* <div className="aspect-video overflow-hidden bg-muted">
                      <img
                        src={
                          post.image ||
                          "https://fiorinadvocacia.com.br/wp-content/uploads/2024/06/Carteira-de-Trabalho.jpg"
                        }
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div> */}

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(
                            post.category || "Direito"
                          )}`}
                        >
                          {post.category || "Direito"}
                        </span>
                      </div>

                      <h3 className="text-xl font-heading text-gold mb-3 group-hover:text-gold/80 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-foreground/70 mb-4 flex-grow line-clamp-3">
                        {post.subtitle ||
                          "Confira o conteúdo completo clicando aqui."}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border mt-auto">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {formatDate(post.published_date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={16} />
                            {post.reading_time || "5 min"}
                          </span>
                        </div>
                        <ArrowRight
                          size={20}
                          className="text-gold group-hover:translate-x-1 transition-transform"
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              Nenhum artigo encontrado no momento.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
