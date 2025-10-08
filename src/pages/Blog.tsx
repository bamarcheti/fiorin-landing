import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "Trabalhista" | "Previdenciário";
}

const blogPosts: BlogPost[] = [
  {
    id: "direitos-trabalhistas-demissao",
    title: "Principais Direitos Trabalhistas na Demissão",
    excerpt: "Conheça os direitos que todo trabalhador tem ao ser demitido sem justa causa e como garantir que todos sejam cumpridos.",
    date: "15 de Setembro, 2024",
    readTime: "5 min",
    category: "Trabalhista",
  },
  {
    id: "aposentadoria-tempo-contribuicao",
    title: "Como Solicitar Aposentadoria por Tempo de Contribuição",
    excerpt: "Entenda o passo a passo para solicitar sua aposentadoria por tempo de contribuição e quais documentos são necessários.",
    date: "10 de Setembro, 2024",
    readTime: "7 min",
    category: "Previdenciário",
  },
  {
    id: "adicional-insalubridade",
    title: "Adicional de Insalubridade: Quando Você Tem Direito",
    excerpt: "Descubra em quais situações o trabalhador tem direito ao adicional de insalubridade e como calcular o valor correto.",
    date: "5 de Setembro, 2024",
    readTime: "6 min",
    category: "Trabalhista",
  },
  {
    id: "revisao-aposentadoria",
    title: "Revisão de Aposentadoria: Vale a Pena?",
    excerpt: "Entenda quando a revisão de aposentadoria pode aumentar seu benefício e como solicitar essa revisão.",
    date: "1 de Setembro, 2024",
    readTime: "8 min",
    category: "Previdenciário",
  },
  {
    id: "acidente-trabalho-direitos",
    title: "Acidente de Trabalho: Seus Direitos e Garantias",
    excerpt: "Conheça todos os direitos do trabalhador que sofreu acidente de trabalho e como proceder para garantir seus benefícios.",
    date: "28 de Agosto, 2024",
    readTime: "6 min",
    category: "Trabalhista",
  },
  {
    id: "bpc-loas-requisitos",
    title: "BPC/LOAS: Requisitos e Como Solicitar",
    excerpt: "Saiba quem tem direito ao Benefício de Prestação Continuada e qual o procedimento para fazer o requerimento.",
    date: "25 de Agosto, 2024",
    readTime: "7 min",
    category: "Previdenciário",
  },
];

const Blog = () => {
  const getCategoryColor = (category: string) => {
    return category === "Trabalhista" 
      ? "bg-gold/20 text-gold border-gold/30" 
      : "bg-primary/20 text-primary border-primary/30";
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-heading text-gold mb-6">
              Blog Jurídico
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Artigos e informações sobre Direito Trabalhista e Previdenciário 
              para manter você sempre bem informado.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${post.id}`}
                className="group"
              >
                <Card className="bg-card border-border p-6 h-full hover:border-gold/50 transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading text-gold mb-3 group-hover:text-gold/80 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-foreground/70 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight 
                      size={20} 
                      className="text-gold group-hover:translate-x-1 transition-transform" 
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
