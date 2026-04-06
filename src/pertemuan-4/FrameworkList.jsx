import frameworkData from "./framework.json";

export default function FrameworkList() {
  return (
    // Menambahkan bg-gray-50 di body agar kartu putih terlihat "pop"
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8 px-2">Frameworks</h1>
      
      <div className="grid gap-6">
        {frameworkData.map((item) => (
          <div 
            key={item.id} 
            // --- PERUBAHAN DI SINI UNTUK EFEK POP UP ---
            className="group bg-white p-6 rounded-2xl border border-gray-100 
                       /* 1. Transisi dasar (halus) */
                       transition-all duration-300 ease-in-out 
                       /* 2. Bayangan tipis saat normal */
                       shadow-sm 
                       /* 3. Efek Hover: Angkat sedikit, besarkan dikit, bayangan tebal */
                       hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-200/70 
                       /* Pastikan cursor berubah jadi pointer agar user tahu ini bisa diklik */
                       cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                {/* Header Section */}
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h2>
                  <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                    {item.details.developer}
                  </span>
                </div>

                <p className="text-gray-500 leading-relaxed text-sm mb-4">
                  {item.description}
                </p>

                {/* Tags Section */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Section */}
              <div className="pt-4 md:pt-0 border-t md:border-t-0 border-gray-50 flex-shrink-0">
                <a
                  href={item.details.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Menambahkan relative z-10 agar link tetap bisa diklik meskipun kartu diangkat
                  className="relative z-10 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Visit Website
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}