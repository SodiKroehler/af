// /app/about/page.tsx (Next.js 13+)
import Image from "next/image";
import { Mail, Instagram, Link, Youtube } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white text-ink min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex flex-col items-center text-center space-y-6">
          <Image
            src="/logo.png" // Place your uploaded logo in /public
            alt="Azalea's Frequency Logo"
            width={300}
            height={300}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold text-forest">Sunshine Huggins</h1>
          <p className="text-lg text-left text-gray-700 max-w-xl">
            Sunshine Huggins is a talented young harpist from Chesapeake, Virginia, whose journey has captivated audiences across the region. At just 16, she performed for state senators and local dignitaries, and now she's setting her sights on a future filled with music, community service, and dreams of becoming a professional musician.
          </p>
        </div>

        <section className="text-left text-ink space-y-4">
          <h2 className="text-2xl text-forest font-semibold">A Rising Star</h2>
          <p>
            Sunshine’s love for the harp began in childhood, drawn to its elegant sound and emotive power. Despite the rarity of harpists in her area, she committed herself to mastering the instrument—attending lessons, performing at civic events, and inspiring others with her graceful playing.
          </p>
          <p>
            Her dedication caught the attention of local media, and with the support of her community and a grant from 13NewsNow’s "HeartThreads," she was recently gifted her very own harp—one she describes as the instrument of her dreams.
          </p>
          <p>
            Now, Sunshine is channeling that gratitude into performance and outreach, showing younger students that classical music can still be powerful, expressive, and deeply human.
          </p>
        </section>

        <section className="text-left text-ink space-y-4">
          <h2 className="text-2xl text-forest font-semibold">Looking Ahead</h2>
          <p>
            With her new harp and her signature smile, Sunshine plans to pursue a degree in music and continue performing across the state. She also hopes to launch a youth music program in the future, giving other kids the kind of opportunity she’s so grateful to have received.
          </p>
        </section>
        <section className="text-left text-ink space-y-6">
          <h2 className="text-2xl text-forest font-semibold">Connect</h2>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Instagram className="text-forest" size={20} />
              <a
                href="https://www.instagram.com/sunnyyraain/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest hover:underline"
              >
                @sunnyyraain
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Instagram className="text-forest" size={20} />
              <a
                href="https://www.instagram.com/azaleasfrequency/?next=%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest hover:underline"
              >
                @azaleasfrequency
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Youtube className="text-forest" size={20} />
              <a
                href="https://www.youtube.com/@DottySnA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest hover:underline"
              >
                YouTube / @DottySnA
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Link className="text-forest" size={20} />
              <a
                href="https://linktr.ee/azaleasfrequency?fbclid=PAZXh0bgNhZW0CMTEAAadOpJeorCqq8WJjG3CHe7oZP1og6Cks1Kd3jnmpxy1ut7HJHzO9YBOehp9agA_aem_ZGuy1kw5gpZsFwsOzHhr5Q"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest hover:underline"
              >
                Azalea’s Frequency Linktree
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="text-forest" size={20} />
              <a
                href="mailto:squirrel252@icloud.com"
                className="text-forest hover:underline"
              >
                squirrel252@icloud.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}