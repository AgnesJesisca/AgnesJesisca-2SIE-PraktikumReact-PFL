import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { TIER_DISCOUNT, calculateDiscount, calculatePoints } from "@/lib/constants";
import PageHeader from "@/components/PageHeader";
import { AiOutlineDelete } from "react-icons/ai";

export default function Checkout() {
  const { profile, refreshProfile } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .gt('stock', 0)
        .order('name');

      if (!error && data) setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const tier = profile?.tier || 'bronze';
  const discountPercent = TIER_DISCOUNT[tier] || 5;

  const totalOriginal = cart.reduce((sum, item) => sum + Number(item.price) * item.qty, 0);
  const totalDiscount = calculateDiscount(totalOriginal, tier);
  const totalFinal = totalOriginal - totalDiscount;
  const pointsEarned = calculatePoints(totalFinal);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError("Cart is empty");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const { error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_id: profile.id,
          total_original: totalOriginal,
          total_discount: totalDiscount,
          total_final: totalFinal,
          points_earned: pointsEarned,
          status: 'pending',
        }]);

      if (orderError) {
        setError(orderError.message);
        setSubmitting(false);
        return;
      }

      // Update member points
      const newPoints = (profile.points || 0) + pointsEarned;
      await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', profile.id);

      // Reduce stock for each product in cart
      for (const item of cart) {
        await supabase
          .from('products')
          .update({ stock: item.stock - item.qty })
          .eq('id', item.id);
      }

      await refreshProfile();
      setCart([]);
      setSuccess(`Order placed successfully! You earned ${pointsEarned} points.`);
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 min-h-screen">
      <div className="p-5 space-y-5">
        <PageHeader
          title="Checkout"
          breadcrumb={`Your Tier: ${tier.toUpperCase()} (${discountPercent}% discount)`}
        />

        {error && (
          <div className="bg-red-200 p-4 text-sm text-gray-600 rounded flex items-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 p-4 text-sm text-green-700 rounded flex items-center">
            {success}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product List */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products.map(product => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      Rp {Number(product.price).toLocaleString()} | Stock: {product.stock}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-semibold mb-4">Cart ({cart.length} items)</h3>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Cart is empty</p>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Rp {Number(item.price).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 bg-gray-200 rounded text-sm"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 bg-gray-200 rounded text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 ml-2"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>Rp {totalOriginal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({tier} {discountPercent}%):</span>
                    <span>- Rp {totalDiscount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>Rp {totalFinal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-blue-600">
                    <span>Points to earn:</span>
                    <span>+{pointsEarned} pts</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={submitting}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {submitting ? "Processing..." : "Place Order"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
