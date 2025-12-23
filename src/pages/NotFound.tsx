import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Página não encontrada"
        description="A página que você está procurando não existe. Volte para a página inicial da Fiorin Advocacia."
      />
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-8xl font-heading text-gold mb-4">404</h1>
          <p className="text-xl text-foreground/80 mb-8">
            Ops! A página que você procura não foi encontrada.
          </p>
          <Button asChild className="bg-gold hover:bg-gold/90 text-primary-foreground">
            <Link to="/">
              <Home className="mr-2" size={20} />
              Voltar para o Início
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
