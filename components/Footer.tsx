import { MessageCircle } from "lucide-react";

export function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "233534908166";

  return (
    <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
      <div className="max-w-lg mx-auto px-5 sm:px-6 space-y-4">

        {/* Main line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-gray-500">
          <span>© {new Date().getFullYear()} Nogadex Consults</span>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>+233 534 908 166</span>
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-[12px] text-gray-400 leading-relaxed text-center sm:text-left">
          Nogadex Consults is an independent consultancy. WAEC is a trademark of the West African Examinations Council. We are not affiliated with or endorsed by WAEC.
        </p>

      </div>
    </footer>
  );
}
