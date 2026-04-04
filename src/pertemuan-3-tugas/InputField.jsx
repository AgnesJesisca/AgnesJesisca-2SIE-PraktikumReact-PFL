export default function InputField({ label, type, placeholder, value, onChange, error }) { 
  return (
    <div className="mb-3">
      <label className="block text-gray-700 font-medium mb-1">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded outline-none transition-all ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
        }`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}