import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const whatsappLink = "https://wa.me/556796938634?text=Olá,%20vim%20do%20Blog%20e%20gostaria%20de%20falar%20com%20um%20especialista.";

  // Aqui você pode buscar o conteúdo do post baseado no slug
  // Por enquanto, vou usar um conteúdo de exemplo
  const post = {
    title: "Principais Direitos Trabalhistas na Demissão",
    date: "15 de Setembro, 2024",
    readTime: "5 min",
    category: "Trabalhista",
    content: `
      <h2>Introdução</h2>
      <p>A demissão sem justa causa é um momento delicado na vida de qualquer trabalhador. É fundamental conhecer seus direitos para garantir que tudo seja feito conforme a legislação trabalhista brasileira.</p>

      <h2>Principais Direitos na Demissão Sem Justa Causa</h2>
      
      <h3>1. Aviso Prévio</h3>
      <p>O trabalhador tem direito a receber o aviso prévio, que pode ser trabalhado ou indenizado. O período mínimo é de 30 dias, podendo ser acrescido de 3 dias por ano trabalhado, até o máximo de 90 dias.</p>

      <h3>2. Saldo de Salário</h3>
      <p>Todos os dias trabalhados no mês da demissão devem ser pagos proporcionalmente.</p>

      <h3>3. Férias Vencidas e Proporcionais</h3>
      <p>As férias não gozadas devem ser pagas com o adicional de 1/3 constitucional, além das férias proporcionais ao período trabalhado.</p>

      <h3>4. 13º Salário Proporcional</h3>
      <p>O trabalhador tem direito ao 13º proporcional aos meses trabalhados no ano da demissão.</p>

      <h3>5. Multa de 40% do FGTS</h3>
      <p>Na demissão sem justa causa, o empregador deve pagar uma multa de 40% sobre o saldo do FGTS depositado durante o contrato.</p>

      <h3>6. Saque do FGTS</h3>
      <p>O trabalhador poderá sacar todo o saldo depositado na conta do FGTS.</p>

      <h3>7. Seguro-Desemprego</h3>
      <p>Dependendo do tempo de trabalho e das contribuições anteriores, o trabalhador pode ter direito ao seguro-desemprego.</p>

      <h2>Prazos para Pagamento</h2>
      <p>As verbas rescisórias devem ser pagas em até 10 dias após a demissão. O não cumprimento deste prazo pode gerar multa a favor do trabalhador.</p>

      <h2>Quando Procurar um Advogado?</h2>
      <p>É recomendável buscar orientação jurídica especializada quando:</p>
      <ul>
        <li>Houver divergência nos valores das verbas rescisórias</li>
        <li>O empregador não efetuar o pagamento no prazo legal</li>
        <li>Existirem horas extras, adicionais ou outras verbas não pagas</li>
        <li>Você tiver dúvidas sobre seus direitos</li>
      </ul>

      <h2>Conclusão</h2>
      <p>Conhecer seus direitos trabalhistas é essencial para garantir que a rescisão contratual seja feita de forma justa e legal. Em caso de dúvidas ou problemas, não hesite em buscar auxílio jurídico especializado.</p>
    `,
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-8 text-gold hover:text-gold/80 hover:bg-gold/10"
          >
            <ArrowLeft className="mr-2" size={20} />
            Voltar para o Blog
          </Button>

          {/* Article Header */}
          <article>
            <div className="mb-8">
              <span className="inline-block text-sm font-medium px-4 py-2 rounded-full border bg-gold/20 text-gold border-gold/30 mb-4">
                {post.category}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-heading text-gold mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={18} />
                  {post.readTime} de leitura
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-invert prose-gold max-w-none
                prose-headings:font-heading prose-headings:text-gold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-foreground/80 prose-li:mb-2
                prose-strong:text-gold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-16 p-8 bg-navy-light rounded-lg border border-border text-center">
              <h3 className="text-2xl font-heading text-gold mb-4">
                Ficou com alguma dúvida?
              </h3>
              <p className="text-foreground/80 mb-6">
                Entre em contato conosco e receba orientação jurídica especializada.
              </p>
              <Button 
                size="lg"
                onClick={() => window.open(whatsappLink, '_blank')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                <MessageCircle className="mr-2" size={20} />
                Falar com um Especialista
              </Button>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
