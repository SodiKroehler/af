import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-cream text-ink font-sans">

            <main className="flex flex-grow w-full overflow-hidden bg-forest text-cream">
                <div className="flex-1 h-full bg-cream flex items-center justify-center">
                    <section className="max-w-lg w-full p-8 rounded-lg shadow-lg bg-cream text-ink">
                        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                        <p className="mb-4">
                            For inquiries, please reach out to us using the information below:
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <strong>Email:</strong> contact@example.com
                            </li>
                            <li>
                                <strong>Phone:</strong> +1 (555) 123-4567
                            </li>
                            <li>
                                <strong>Address:</strong> 123 Main St, City, Country
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="h-full w-[40%] min-w-[320px] relative">
                    <Image
                        src="/contact.png"
                        alt="Contact Visual"
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-contain object-right animate-pan"
                        priority
                    />
                </div>
            </main>
        </div>
    );
}