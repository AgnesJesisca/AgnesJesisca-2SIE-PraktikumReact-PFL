export default function PageHeader({ title, breadcrumb, children }) {
  return (
    <div className="bg-white mt-5 p-5 rounded-lg shadow flex justify-between items-center w-full">
      
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-400">{breadcrumb}</p>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}