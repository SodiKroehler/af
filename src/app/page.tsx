import Image from "next/image"
import Link from "next/link"
import { WendellVines } from "@components/WendellVines"

import "@lib/wendell/wendell.css"

export default function Home() {
  return (
    <>
      {/* In-flow height so the section still fills the layout below the fixed header */}
      <div aria-hidden className="min-h-[calc(100dvh-100px)] shrink-0" />
      <div className="fixed inset-0 z-[1] min-h-0 bg-cream">
        <div className="wendell-vine-host absolute inset-0 min-h-0">
          <WendellVines />
        </div>
      </div>
      <div className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center p-4">
        <div className="rounded-2xl bg-white/50 px-8 py-6 shadow-sm backdrop-blur-[3px] md:px-12 md:py-10">
          <Link
            href="/"
            className="pointer-events-auto block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest/50"
          >
            <Image
              src="/logo.png"
              alt="Azalea's Frequency logo"
              width={640}
              height={640}
              className="h-auto w-[min(78vw,400px)] max-w-full object-contain drop-shadow-[2px_2px_8px_rgba(30,61,52,0.12)]"
              priority
            />
          </Link>
        </div>
      </div>
    </>
  )
}
