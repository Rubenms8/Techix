import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-7xl text-accent/40">404</p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-fg">
        Esta página se ha perdido
      </h1>
      <p className="mt-3 max-w-md text-muted">
        El enlace no existe o el contenido se ha movido. Vuelve al inicio o busca lo que necesitas.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Ir al inicio</Link>
        <Link href="/buscar" className="btn-secondary">Buscar</Link>
      </div>
    </section>
  );
}
