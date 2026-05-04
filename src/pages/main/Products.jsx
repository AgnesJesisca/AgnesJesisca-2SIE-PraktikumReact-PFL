import products from "../../data/Products.json";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function Products() {
  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-5">
      <PageHeader title="Products" breadcrumb="Dashboard / Product List" />

      <div className="bg-white rounded-lg shadow mt-5">
        <table className="w-full text-left">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={item.code} className="border-t">
                <td className="px-6 py-4">{index + 1}</td>

                {/* 🔥 LINK KE DETAIL */}
                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.code}`}
                    className="text-emerald-500 hover:underline"
                  >
                    {item.title}
                  </Link>
                </td>

                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.brand}</td>
                <td className="px-6 py-4">Rp {item.price * 1000}</td>
                <td className="px-6 py-4">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}