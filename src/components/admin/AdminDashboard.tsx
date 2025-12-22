import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { FileText, LogOut } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Importa o estilo do editor
import { useNavigate } from "react-router-dom";

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Form States
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState(""); // O Quill gerencia isso
  // const [readingTime, setReadingTime] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("Trabalhista");
  const { toast } = useToast();

  // Configuração da Barra de Ferramentas do Editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Títulos H1, H2, H3
      ["bold", "italic", "underline", "strike"], // Negrito, Itálico...
      [{ color: [] }, { background: [] }], // Cor da fonte e fundo
      [{ list: "ordered" }, { list: "bullet" }], // Listas
      ["link", "clean"], // Links e limpar formatação
    ],
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/admin");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/admin");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Calculate reading time automatically
  const readingTime = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / 200);
    return minutes > 0 ? `${minutes} min de leitura` : "0 min de leitura";
  }, [content]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verifica se o usuário está logado antes de postar
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Sessão expirada",
          description: "Por favor, faça login novamente.",
          variant: "destructive",
        });
        // toast.error("Sessão expirada. Faça login novamente.");
        navigate("/admin");
        return;
      }

      const { error } = await supabase.from("posts").insert({
        title: title.trim(),
        subtitle: subtitle.trim(),
        content: content, // Agora enviamos o HTML gerado pelo editor
        published_date: publishedDate,
        reading_time: readingTime,
        // Se você já criou as colunas no banco, descomente abaixo:
        // image_url: imageUrl,
        // category: category
      });

      if (error) throw error;

      // toast.success("Artigo publicado com sucesso!");
      toast({
        title: "Artigo publicado com sucesso!",
        description: "",
        variant: "default",
      });
      // Limpar formulário
      setTitle("");
      setSubtitle("");
      setContent("");
      // setReadingTime("");
      setPublishedDate("");
      setImageUrl("");
    } catch (error: any) {
      console.error("Erro:", error);
      // toast.error(error.message || "Erro ao publicar artigo");
      toast({
        // title: `Erro: ${error}`,
        title: "Erro!",
        description: error.message || "Erro ao publicar artigo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="font-heading text-xl text-primary">
              Painel Administrativo
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-border text-primary hover:bg-border/90 hover:text-primary/95"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <Card className="border-primary/20 text-primary">
            <CardHeader>
              <CardTitle>Novo Artigo do Blog</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título do Artigo</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Direitos do Trabalhador Rural"
                    required
                  />
                </div>

                {/* Subtítulo */}
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Um breve resumo que aparecerá no card..."
                  />
                </div>

                {/* Categoria e Tempo de Leitura */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <div className="relative">
                      <select
                        id="category"
                        className="flex h-10 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Trabalhista">Trabalhista</option>
                        <option value="Previdenciário">Previdenciário</option>
                        <option value="Civil">Civil</option>
                        <option value="Consumidor">Consumidor</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="readingTime">Tempo de Leitura</Label>
                    <Input
                      id="readingTime"
                      type="text"
                      value={readingTime}
                      readOnly
                      className="bg-muted border-border text-muted-foreground cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Data e Imagem */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data de Publicação</Label>
                    <Input
                      id="date"
                      type="date"
                      value={publishedDate}
                      onChange={(e) => setPublishedDate(e.target.value)}
                      required
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="image">
                      URL da Imagem de Capa (Opcional)
                    </Label>
                    <Input
                      id="image"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div> */}
                </div>

                {/* EDITOR DE TEXTO RICO (NOVO) */}
                <div className="space-y-2">
                  <Label>Conteúdo do Artigo</Label>
                  <div className="bg-white text-black rounded-md overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      className="h-64 mb-12" // Altura do editor
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold/90 text-primary-foreground"
                  disabled={loading}
                >
                  {loading ? "Publicando..." : "Publicar Artigo"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
