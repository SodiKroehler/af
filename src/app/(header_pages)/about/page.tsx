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
          <h1 className="text-4xl font-bold text-forest">Azalea&apos;s Frequency</h1>
        </div>

        <section className="mx-auto max-w-prose text-left text-ink space-y-6 text-lg leading-relaxed text-gray-800">
          <p>
            Azalea&apos;s Frequency was created by Sunshine Huggins—an entrepreneur, harpist, and wellness visionary—rooted in a simple but powerful belief: music is a universal language, and healing is one of its most natural dialects. Born in the Southtowns of Buffalo, New York and raised in Hampton Roads from the age of nine, Sunshine has been playing the harp since she was six years old. Her lifelong connection to music shapes every part of this platform.
          </p>
          <p>
            Azalea&apos;s Frequency exists to bring awareness to music therapy and to illuminate the everyday ways people use music to soothe, restore, and reconnect with themselves. It is more than a performance service; it is an atmosphere, an experience, and a pathway to wellness.
          </p>
          <p>
            Blending the healing power of harp music with intentional, curated aesthetics, Azalea&apos;s Frequency specializes in crafting immersive environments that transform any event. Whether you envision a fairytale ceremony, an elegant cocktail hour, or a timeless wedding, Sunshine brings beauty, class, and a tailored aesthetic that elevates your vision. Every booking is thoughtful, personalized, and designed to harmonize with the energy of your moment.
          </p>
          <p>
            From individuals seeking healing through holistic practices to event organizers and performing artists desiring unique atmospheres, Azalea&apos;s Frequency offers a space where artistry and wellness meet—inviting every guest into a world shaped by their own creative sound, beauty, and intention.
          </p>
        </section>

        <section className="mx-auto max-w-prose space-y-10 text-left text-ink text-lg leading-relaxed text-gray-800">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-forest">Long-term vision</h2>
            <p>
              My long-term vision for Azaleas Frequency is to expand this brand into a full transformative retreat, wellness and health spa destination that will offer:
            </p>
            <ul className="list-disc space-y-2 pl-6 marker:text-forest">
              <li>Personalized frequency-based treatments</li>
              <li>Curated playlists designed for emotional and energetic alignment</li>
              <li>Spa rooms with different amenities tuned to specific frequencies</li>
              <li>Vocal release and sound expression rooms</li>
              <li>Mud baths and grounding therapies</li>
              <li>Access to instruments and creative exploration</li>
              <li>Music studio spaces for emotional release and artistic healing</li>
            </ul>
          </div>

          <div className="space-y-6 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-semibold text-forest">Your booking</h2>
            <p>
              Your booking is a direct contribution to building these multi-industry healing spaces, where music becomes a tool for restoration, and where the wellness you experience is something you can carry with you long after the moment ends. By choosing Azalea&apos;s Frequency, you are not only supporting the creation of a music-therapy-centered spa and retreat, but you are also uplifting representation in a field where it is needed.
            </p>
            <p>
              Every booking helps bring visibility to Black musicians, Black healers, and Black innovators within the music therapy world. It supports the presence of the harp—a historically exclusive instrument—being used as a therapeutic tool in the hands of a melanated woman who is reshaping what healing can look and sound like. Azalea&apos;s Frequency stands as a testament to cultural presence, artistic excellence, and the power of sound to transform lives.
            </p>
            <p>
              But for now, Azaleas Frequency will provide solace in grief and joy in celebration.
            </p>
            <p>
              My goal is to empower individuals to create their desired world through a beautiful blend of sound and sight, fostering a rich healing experience.
            </p>
          </div>
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