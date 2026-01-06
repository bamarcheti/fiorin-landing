export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    projectId: import.meta.env.VITE_SUPABASE_PROJECT_ID,
  },
};

// Validar que todas as variáveis existem
Object.entries(env.supabase).forEach(([key, value]) => {
  if (!value) {
    throw new Error(
      `Variável de ambiente VITE_SUPABASE_${key.toUpperCase()} não está definida`
    );
  }
});
