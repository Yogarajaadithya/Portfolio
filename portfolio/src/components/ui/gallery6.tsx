"use client";

interface GalleryItem {
    id: string;
    title: string;
    summary: string;
    url: string;
    image: string;
}

interface Gallery6Props {
    heading?: string;
    items?: GalleryItem[];
    onItemClick?: (item: GalleryItem) => void;
}

const Gallery6 = ({
    heading = "Gallery",
    items = [],
    onItemClick,
}: Gallery6Props) => {
    return (
        <section className="py-24 px-8 md:px-16 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                {/* Left — Title */}
                <div className="lg:w-[220px] shrink-0 lg:sticky lg:top-24">
                    <h2
                        className="text-4xl md:text-6xl font-bold text-zinc-900 leading-tight"
                        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    >
                        {heading}
                    </h2>
                </div>

                {/* Right — Project Grid */}
                <div className="flex-1 flex flex-col md:flex-row gap-8">
                    {items.map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            onClick={(e) => {
                                if (onItemClick) {
                                    e.preventDefault();
                                    onItemClick(item);
                                }
                            }}
                            className="group flex flex-col flex-1 min-w-0"
                        >
                            <div className="aspect-[3/2] overflow-clip rounded-xl">
                                <div className="h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <div className="pt-4 text-lg font-medium md:text-xl lg:text-2xl text-zinc-900">
                                {item.title}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Gallery6 };
