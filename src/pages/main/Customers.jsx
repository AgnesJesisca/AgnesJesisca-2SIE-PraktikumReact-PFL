import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import PageHeader from "../../components/PageHeader";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    role: "member",
    tier: "bronze",
    points: 0,
  });

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCustomers(data);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([form]);

      if (error) {
        console.error('Error adding customer:', error.message);
        return;
      }

      await fetchCustomers();
      setShowForm(false);
      setForm({ full_name: "", role: "member", tier: "bronze", points: 0 });
    } catch (err) {
      console.error('Error:', err);
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
          title="Customer" 
          breadcrumb="Dashboard / Customer List"
        >
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-hijau text-white px-4 py-2 rounded-lg"
          >
            Add Customer
          </button>
        </PageHeader>

        {showForm && (
          <div className="bg-white p-5 rounded shadow space-y-3">
            <input
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 w-full"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <select
              name="tier"
              value={form.tier}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            <input
              type="number"
              name="points"
              value={form.points}
              onChange={handleChange}
              placeholder="Points"
              className="border p-2 w-full"
            />
            <button 
              onClick={handleSubmit}
              className="bg-hijau text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Tier</th>
                <th className="p-3">Points</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3 text-xs text-gray-400">{c.id.slice(0, 8)}...</td>
                  <td className="p-3">{c.full_name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium capitalize
                      ${c.role === "admin" && "bg-red-100 text-red-600"}
                      ${c.role === "member" && "bg-blue-100 text-blue-600"}
                    `}>
                      {c.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium capitalize
                      ${c.tier === "gold" && "bg-yellow-100 text-yellow-600"}
                      ${c.tier === "silver" && "bg-gray-200 text-gray-600"}
                      ${c.tier === "bronze" && "bg-orange-100 text-orange-600"}
                      ${c.tier === "platinum" && "bg-purple-100 text-purple-600"}
                    `}>
                      {c.tier}
                    </span>
                  </td>
                  <td className="p-3">{c.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
