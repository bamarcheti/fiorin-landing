export const Sobre = () => {
  return (
    <section id="sobre" className="py-20 px-6 bg-navy-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading text-gold text-center mb-12">
          Conheça o nosso escritório
        </h2>
        
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
          </div>
        </div>
      </div>
    </section>
  );
};
