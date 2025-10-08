import { Card } from "@/components/ui/card";
import { Scale, Briefcase } from "lucide-react";

export const AreasAtuacao = () => {
  const previdenciario = [
    "Aposentadoria por tempo de contribuição",
    "Aposentadoria por invalidez",
    "Aposentadoria rural",
    "Auxílio acidente",
    "Auxílio reclusão",
    "BPC – LOAS",
  ];

  const trabalhistas = [
    "Trabalho sem registro em carteira",
    "Adicional de insalubridade",
    "Adicional de periculosidade",
    "Adicional noturno",
    "Estabilidade da gestante",
    "Acidente de trabalho",
  ];

  return (
    <section id="areas" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-16">
          Áreas de Atuação
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-card border-border p-8 hover:border-gold/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-8 w-8 text-gold" />
              <h3 className="text-2xl font-heading text-gold">Previdenciário</h3>
            </div>
            <ul className="space-y-3">
              {previdenciario.map((item, index) => (
                <li key={index} className="text-foreground/80 flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-card border-border p-8 hover:border-gold/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-8 w-8 text-gold" />
              <h3 className="text-2xl font-heading text-gold">Trabalhistas</h3>
            </div>
            <ul className="space-y-3">
              {trabalhistas.map((item, index) => (
                <li key={index} className="text-foreground/80 flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
};
