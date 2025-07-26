import Image from "next/image"

export default function Home() {
  return (
<div className="flex flex-1 h-full bg-cream text-ink font-sans">
  {/* Left content placeholder (can be text or left empty) */}
  <div className="flex-1 p-8">
    {/* You can put intro text or leave it blank */}
    <h1 className="text-4xl font-bold">Welcome</h1>
    <p className="mt-4 text-lg">This is Azaleas Frequency.</p>
  </div>

  {/* Right image block */}
  <div className="w-1/2 min-w-[320px] relative h-full overflow-hidden">
    <Image
      src="/homepage.png"
      alt="Homepage Visual"
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-contain object-right animate-pan"
      priority
    />
  </div>
</div>

  )
}