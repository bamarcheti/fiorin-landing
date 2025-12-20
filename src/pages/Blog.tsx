import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

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
              Blog
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Veja nossos conteúdos, e entenda melhor seus direitos e como podemos ajudá-lo!
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
                <Card className="bg-card border-border overflow-hidden h-full hover:border-gold/50 transition-all duration-300 flex flex-col">
                  {/* Post Image */}
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
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
