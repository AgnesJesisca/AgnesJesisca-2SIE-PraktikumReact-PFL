import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-5">
      <PageHeader title="Products" breadcrumb="Dashboard / Product List" />
      
      <div className="bg-white rounded-lg shadow mt-5">
        <table className="w-full text-left">
          <thead className="bg-emerald-600 text-white">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr key={item.id} className="border-t">
                <td className="px-6 py-4">{index + 1}</td>

                {/* LINK KE DETAIL */}
                <td className="px-6 py-4">
                  <Link
                    to={`/products/${item.id}`}
                    className="text-emerald-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                </td>

                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{item.description || '-'}</td>
                <td className="px-6 py-4">Rp {Number(item.price).toLocaleString()}</td>
                <td className="px-6 py-4">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
