import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Facebook, Linkedin } from "lucide-react";

export const Contato = () => {
  const whatsappLink = "https://wa.me/556796938634?text=Olá,%20vim%20do%20Site%20e%20gostaria%20de%20falar%20com%20um%20especialista.";

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/fiorin.advocacia/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/fiorin.advocacia/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/fiorin-advocacia", label: "LinkedIn" },
  ];

  return (
    <section id="contato" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-heading text-gold">
          Está em busca de orientação jurídica?
        </h2>
        
        <p className="text-xl text-foreground/80 font-light max-w-2xl mx-auto">
          Entre em contato conosco e tenha o suporte especializado que você precisa 
          para resolver sua situação.
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

        <div className="pt-8">
          <p className="text-muted-foreground mb-4">Siga-nos nas redes sociais</p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-background transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
