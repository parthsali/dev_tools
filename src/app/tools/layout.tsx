import { Footer } from "@/components/layout/footer";


export default function ToolsLayout({ children }: { children: React.ReactNode }) {
    return <>
        <div className="min-h-screen">
            {children}
        </div>
        <Footer />
    </>;
}