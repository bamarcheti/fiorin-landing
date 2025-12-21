import { useState, useMemo } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Send, FileText } from "lucide-react";

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [publishedDate, setPublishedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Calculate reading time automatically
  const readingTime = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / 200);
    return minutes > 0 ? `${minutes} min de leitura` : "0 min de leitura";
  }, [content]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !subtitle.trim() || !content.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("posts").insert({
      title: title.trim(),
      subtitle: subtitle.trim(),
      published_date: publishedDate,
      content: content.trim(),
      reading_time: readingTime,
    });

    if (error) {
      toast({
        title: "Erro ao publicar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Artigo publicado!",
        description: "O artigo foi salvo com sucesso.",
      });
      // Clear form
      setTitle("");
      setSubtitle("");
      setContent("");
      setPublishedDate(new Date().toISOString().split("T")[0]);
    }

    setSaving(false);
  };

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
              className="border-border text-foreground hover:bg-secondary"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h2 className="font-heading text-2xl text-foreground mb-6">
            Novo Artigo
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground">
                Título
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Digite o título do artigo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-foreground">
                Subtítulo
              </Label>
              <Input
                id="subtitle"
                type="text"
                placeholder="Digite o subtítulo do artigo"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Date and Reading Time Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground">
                  Data de Publicação
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readingTime" className="text-foreground">
                  Tempo de Leitura
                </Label>
                <Input
                  id="readingTime"
                  type="text"
                  value={readingTime}
                  readOnly
                  className="bg-muted border-border text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-foreground">
                Conteúdo do Artigo (Markdown)
              </Label>
              <Textarea
                id="content"
                placeholder="Escreva o conteúdo do artigo em Markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-y font-mono text-sm"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? (
                "Publicando..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Publicar
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
