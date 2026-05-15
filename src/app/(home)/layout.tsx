import Image from "next/image";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col bg-forest">
      <header className="fixed top-0 left-0 right-0 z-50 flex h-[100px] w-full items-center justify-between border-0 bg-forest px-8 py-4">
        <a
          href="/"
          className="shrink-0 opacity-95 transition-opacity hover:opacity-100"
        >
          <span className="logo-blend-host logo-blend-host--light h-10">
            <Image
              src="/logo.jpeg"
              alt="Azalea's Frequency"
              width={120}
              height={106}
              className="h-full w-auto max-w-[140px] object-contain object-left"
              priority
            />
          </span>
        </a>
        <nav className="space-x-8 text-sm tracking-wider text-gold uppercase">
          <a href="/" className="hover:text-gold">
            Home
          </a>
          <a href="/about" className="hover:text-gold">
            About
          </a>
          <a href="/gallery" className="hover:text-gold">
            Gallery
          </a>
          <a href="/book" className="hover:text-gold">
            Book
          </a>
        </nav>
      </header>
      <section className="relative flex min-h-0 w-full flex-1 flex-col bg-forest pt-[100px] text-cream">
        {children}
      </section>
    </div>
  );
}
