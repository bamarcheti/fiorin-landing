import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AreasAtuacao } from "@/components/AreasAtuacao";
import { Sobre } from "@/components/Sobre";
import { Contato } from "@/components/Contato";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
