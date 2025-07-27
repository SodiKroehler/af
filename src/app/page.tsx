import Image from "next/image"

export default function Home() {
  return (
<div className="flex flex-1 h-full bg-cream text-ink font-sans justify-center items-center">

  {/* Right image block */}
  <div className="w-1/2 min-w-[320px] relative h-full overflow-hidden justify-center items-center">
    {/* <Image
      src="/logo.png"
      alt="Azaleas Frequency Logo"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-contain object-center animate-pan"
      priority
    /> */}
<h1 className="absolute inset-0 flex justify-center items-center text-[15vw] text-forest drop-shadow-[3_3px_3px_gold] font-bold tracking-wider uppercase">
  AF
</h1>
  </div>
</div>

  )
}