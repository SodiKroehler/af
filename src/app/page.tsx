import { WendellVines } from "@components/WendellVines"

import "@lib/wendell/wendell.css"

export default function Home() {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-cream">
      <div className="wendell-vine-host absolute inset-0 min-h-0">
        <WendellVines />
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="rounded-2xl bg-white/50 px-10 py-6 shadow-sm backdrop-blur-[3px] md:px-14 md:py-10">
          <h1 className="text-[clamp(3rem,15vw,10rem)] font-bold uppercase leading-none tracking-wider text-forest drop-shadow-[3px_3px_3px_rgba(199,160,70,0.5)]">
            AF
          </h1>
        </div>
      </div>
    </div>
  )
}
