import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Home", url: "#home" },
    { name: "About", url: "#about" },
    { name: "Projects", url: "#projects" },
    { name: "Contact", url: "#contact" },
]

export function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center justify-center rounded-2xl bg-background py-5 px-32 shadow-lg border gap-12">
                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            className="text-xl font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className={cn("w-[240px] sm:w-[300px]")}>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <div className="flex flex-col gap-6 mt-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
