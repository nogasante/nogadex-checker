import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StudentPortalHub } from "@/components/StudentPortalHub";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 px-5 sm:px-6">
        <div className="max-w-lg mx-auto">
          <StudentPortalHub />
        </div>
      </main>

      <Footer />
    </div>
  );
}
