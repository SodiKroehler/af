import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink font-sans">
      {/* Top nav */}
      <header className="z-10 w-full border-b border-gold px-8 py-4 flex items-center justify-between bg-cream">
        <Image src="/logo.png" alt="Logo" width={120} height={40} priority />
        <nav className="space-x-8 text-sm tracking-wider uppercase">
          <a href="#about" className="hover:text-gold">About</a>
          <a href="#library" className="hover:text-gold">Library</a>
          <a href="#contact" className="hover:text-gold">Contact</a>
        </nav>
      </header>

      <section className="flex flex-grow w-full overflow-hidden bg-forest text-cream">
        <div className="flex-1 h-full bg-cream"></div>
        <div className="h-full w-[40%] min-w-[320px]">
          <Image
            src="/homepage.png"
            alt="Homepage Visual"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-contain object-right animate-pan"
            priority
          />
        </div>
        
      </section>
    </div>
  )
}