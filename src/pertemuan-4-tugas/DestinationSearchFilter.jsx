export default function SearchBar({ dataForm, handleChange, categories, statuses }) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search Input - Full Width */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          type="text"
          name="searchTerm"
          value={dataForm.searchTerm}
          placeholder="Search destination or location..."
          className="w-full p-3 pl-12 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
          onChange={handleChange}
        />
      </div>

      {/* Filters - Stack on Mobile, Side-by-side on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Category</label>
          <select 
            name="selectedCategory" 
            value={dataForm.selectedCategory}
            className="p-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm" 
            onChange={handleChange}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase text-slate-400 ml-1">Availability</label>
          <select 
            name="selectedStatus" 
            value={dataForm.selectedStatus}
            className="p-3 border border-gray-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-sm" 
            onChange={handleChange}
          >
            <option value="">All Status</option>
            {statuses.map((st) => <option key={st} value={st}>{st}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}