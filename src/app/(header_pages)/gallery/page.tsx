import Image from "next/image";

const images = [
  { id: 1, src: "/imgs/08_30_23_1.png", alt: "August 30th Portrait" },
  { id: 2, src: "/imgs/oct_22_23_1.png", alt: "October 22nd 1" },
  { id: 3, src: "/imgs/oct_22_23_2.png", alt: "October 22nd 2" },
  { id: 4, src: "/imgs/oct_22_23_3.png", alt: "October 22nd 3" },
  { id: 5, src: "/imgs/oct_22_23_4.png", alt: "October 22nd 4" },
  { id: 6, src: "/imgs/oct_22_23_5.png", alt: "October 22nd 5" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <h1 className="text-6xl text-center text-forest mb-10 tracking-wider uppercase">
          Gallery
        </h1>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid overflow-hidden rounded-2xl shadow-lg border border-gold bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={1000}
                layout="responsive"
                className="object-cover w-full h-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
