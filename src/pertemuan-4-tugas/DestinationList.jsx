import { useState } from "react";
import destinationData from "./destinations.json"; 
import SearchBar from "./DestinationSearchFilter"; 

export default function DestinationList() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedCategory: "",
    selectedStatus: "",
    viewMode: "guest",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const filteredData = destinationData.filter((item) => {
    const _search = dataForm.searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(_search) ||
      item.location.toLowerCase().includes(_search);

    const matchesCategory = dataForm.selectedCategory
      ? item.category === dataForm.selectedCategory
      : true;

    const matchesStatus = dataForm.selectedStatus
      ? item.status === dataForm.selectedStatus
      : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [...new Set(destinationData.map((d) => d.category))];
  const statuses = [...new Set(destinationData.map((d) => d.status))];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight">IndoExplore</h1>
            <p className="text-slate-500 text-sm">Discover the magic of Indonesia</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-inner border border-gray-200 w-full md:w-auto">
            <button
              onClick={() => setDataForm({ ...dataForm, viewMode: "guest" })}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                dataForm.viewMode === "guest" ? "bg-blue-600 text-white shadow-md" : "text-slate-600"
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => setDataForm({ ...dataForm, viewMode: "admin" })}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                dataForm.viewMode === "admin" ? "bg-blue-600 text-white shadow-md" : "text-slate-600"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* COMPONENT SEARCH BAR */}
        <SearchBar 
          dataForm={dataForm} 
          handleChange={handleChange} 
          categories={categories} 
          statuses={statuses} 
        />

        {/* CONTENT AREA */}
        {dataForm.viewMode === "guest" ? (
          <div className="grid gap-6">
            {filteredData.map((item) => (
              <a 
                key={item.id}
                href={item.details.officialWebsite} 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl block"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  {/* Image Section */}
                  <div className="w-full md:w-44 h-48 md:h-32 flex-shrink-0 relative overflow-hidden rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image" }}
                    />
                  </div>

                  {/* Info Section */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between md:justify-start gap-3 mb-1">
                      <h2 className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.name}
                      </h2>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-xs mb-3 flex items-center gap-1 font-medium">
                      📍 {item.location} • <span className="text-blue-500">{item.category}</span>
                    </p>

                    <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed italic">
                      "{item.description}"
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.details.facilities.map((fac, index) => (
                        <span key={index} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md">
                          #{fac}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & Rating Section */}
                  <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end border-t md:border-t-0 md:border-l border-gray-50 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                    <div className="text-left md:text-right">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Entry Fee</p>
                      <p className="text-lg font-extrabold text-slate-800">
                        {item.details.entryFee === 0 ? "FREE" : `Rp ${item.details.entryFee.toLocaleString()}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="bg-yellow-50 px-2 py-0.5 rounded-md">
                         <span className="text-yellow-600 font-bold text-sm">★ {item.details.rating}</span>
                       </div>
                       <div className="text-blue-600 opacity-0 md:group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                         </svg>
                       </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          /* ADMIN VIEW - TABLE (Responsive Scroll) */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-4">Destination</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Fee</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{item.name}</td>
                      <td className="p-4 text-slate-500">{item.category}</td>
                      <td className="p-4 font-mono text-slate-600">Rp {item.details.entryFee.toLocaleString()}</td>
                      <td className="p-4">
                        <a href={item.details.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">Visit Site</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {filteredData.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200 mt-6">
            <p className="text-slate-400 font-medium italic">Destination not found...</p>
          </div>
        )}
      </div>
    </div>
  );
}