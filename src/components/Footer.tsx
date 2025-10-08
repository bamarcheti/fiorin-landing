export const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Fiorin Advocacia e Consultoria Jurídica. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};
