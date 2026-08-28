import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/70 text-slate-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-8 sm:py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <StudentPortalHub />
        </div>
      </main>

      <Footer />
    </div>
  );
}
