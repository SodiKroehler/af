import Image from "next/image";

const images = [
    {
        id: 1,
        src: "/image1.png",
        alt: "Image 1",
    },
    {
        id: 2,
        src: "/image2.png",
        alt: "Image 2",
    },
    {
        id: 3,
        src: "/image3.png",
        alt: "Image 3",
    },
];

export default function LibraryPage() {
    return (
        <div className="min-h-screen flex flex-col bg-cream text-ink font-sans">
            <main className="flex flex-grow flex-col items-center justify-center bg-forest text-cream py-8">
                <h1 className="text-3xl font-bold mb-8">Image Library</h1>
                <div className="flex gap-6 flex-wrap justify-center">
                    {images.map(image => (
                        <div key={image.id} className="border border-gold bg-cream p-4 rounded shadow">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={200}
                                height={150}
                                className="object-cover rounded"
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}