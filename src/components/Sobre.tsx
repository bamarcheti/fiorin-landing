import advogadoImg from "@/assets/advogado-paulo-fiorin.png";

export const Sobre = () => {
  return (
    <section id="sobre" className="py-20 px-6 bg-navy-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-12">
          Conheça o nosso escritório
        </h2>
        
        <div className="space-y-6 text-foreground/80 text-lg leading-relaxed max-w-4xl mx-auto">
          <p>
            Fiorin Advocacia e Consultoria Jurídica é especializado nas causas trabalhistas 
            e previdenciárias com resultados favoráveis a nossos clientes pelo trabalho técnico 
            e inteligente engajados na solução das demandas, agregando valor em cada trabalho realizado.
          </p>
          
          <p>
            Prestamos serviços jurídicos de excelência com soluções atuais que construam confiança 
            e credibilidade com nossos clientes pela atuação de resultado, de transparência e de responsabilidade.
          </p>
        </div>
        
        <div className="pt-12 border-t border-border mt-12 max-w-5xl mx-auto">
          <h3 className="text-2xl font-heading text-gold mb-8">O Especialista</h3>
          
          <div className="grid md:grid-cols-[1fr,300px] gap-12 items-start">
            <div className="space-y-4 text-foreground/80 text-lg leading-relaxed">
              <p>
                O Escritório Fiorin Advocacia e Consultoria Jurídica foi criado pelo Advogado{" "}
                <span className="text-gold font-medium">Paulo Sérgio Fiorin</span>, Mestre em Direito pela 
                Universidade Federal de Mato Grosso do Sul, especialista em Direito Trabalhista e Previdenciário.
              </p>
              <p>
                Sua proposta é atender os clientes de forma ética nas informações processuais, 
                zelando pelo resultado e disponibilizando canais de atendimento que ofereçam 
                segurança e confiabilidade ao cliente.
              </p>
            </div>
            
            <div className="flex justify-center md:justify-end">
              <img 
                src={advogadoImg} 
                alt="Paulo Sérgio Fiorin - Advogado especialista" 
                className="w-full max-w-[250px] h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
