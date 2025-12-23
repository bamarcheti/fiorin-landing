import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AreasAtuacao } from "@/components/AreasAtuacao";
import { Sobre } from "@/components/Sobre";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Fiorin Advocacia - Direito Trabalhista e Previdenciário em Campo Grande"
        description="Escritório de advocacia especializado em Direito Trabalhista e Previdenciário. Atendimento personalizado e excelência jurídica em Campo Grande, MS."
        canonical="https://fiorinadvocacia.com.br"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "Fiorin Advocacia",
          description: "Escritório especializado em Direito Trabalhista e Previdenciário em Campo Grande, MS.",
          url: "https://fiorinadvocacia.com.br",
          telephone: "+55 67 9693-8634",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Campo Grande",
            addressRegion: "MS",
            addressCountry: "BR",
          },
          priceRange: "$$",
          areaServed: {
            "@type": "State",
            name: "Mato Grosso do Sul",
          },
          serviceType: ["Direito Trabalhista", "Direito Previdenciário"],
          sameAs: [
            "https://www.instagram.com/fiorin.advocacia/",
          ],
        }}
      />
      <Navbar />
      <Hero />
      <AreasAtuacao />
      <Sobre />
      <Contato />
      <Footer />
    </div>
  );
};

export default Index;
