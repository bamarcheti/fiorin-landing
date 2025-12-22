import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/fiorin-logo.png";

export const Hero = () => {
  const whatsappLink = "https://wa.me/556796938634?text=Olá,%20vim%20do%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista.";

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center px-6 py-20 pt-32">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            alt="Fiorin Advocacia" 
            className="w-96 h-auto"
          />
        </div>
        
        <h1 className="text-2xl md:text-3xl text-foreground/90 font-light leading-relaxed max-w-3xl mx-auto">
          Escritório especializado em Direito Trabalhista e Previdenciário.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-light">
          Excelência em atendimento e qualidade de serviço prestado.
        </p>
        
        <div className="pt-4">
          <Button 
            size="lg"
            onClick={() => window.open(whatsappLink, '_blank')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base px-8 py-6 transition-all duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar com um Especialista
          </Button>
        </div>
      </div>
    </section>
  );
};
