import advogadoImg from "@/assets/advogado-paulo-fiorin.png";

export const Sobre = () => {
  return (
    <section id="sobre" className="py-20 px-6 bg-navy-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-12">
          Conheça o nosso escritório
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
            <p>
              Fiorin Advocacia e Consultoria Jurídica é especializado nas causas trabalhistas 
              e previdenciárias com resultados favoráveis a nossos clientes pelo trabalho técnico 
              e inteligente engajados na solução das demandas, agregando valor em cada trabalho realizado.
            </p>
            
            <p>
              Prestamos serviços jurídicos de excelência com soluções atuais que construam confiança 
              e credibilidade com nossos clientes pela atuação de resultado, de transparência e de responsabilidade.
            </p>
            
            <div className="pt-8 border-t border-border mt-8">
              <h3 className="text-2xl font-heading text-gold mb-4">O Especialista</h3>
              <p>
                O Escritório Fiorin Advocacia e Consultoria Jurídica foi criado pelo Advogado{" "}
                <span className="text-gold font-medium">Paulo Sérgio Fiorin</span>, Mestre em Direito pela 
                Universidade Federal de Mato Grosso do Sul, especialista em Direito Trabalhista e Previdenciário.
              </p>
              <p className="mt-4">
                Sua proposta é atender os clientes de forma ética nas informações processuais, 
                zelando pelo resultado e disponibilizando canais de atendimento que ofereçam 
                segurança e confiabilidade ao cliente.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={advogadoImg} 
              alt="Paulo Sérgio Fiorin - Advogado especialista" 
              className="w-full max-w-md h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
