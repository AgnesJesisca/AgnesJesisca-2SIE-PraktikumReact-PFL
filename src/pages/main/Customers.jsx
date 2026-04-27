import { useState } from "react";
import customersData from "../../data/customers.json";
import PageHeader from "../../components/PageHeader";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    loyalty: "Bronze"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newCustomer = {
      customerId: `CUST-${1000 + customers.length + 1}`,
      ...form
    };

    setCustomers([...customers, newCustomer]);
    setShowForm(false);

    setForm({
      customerName: "",
      email: "",
      phone: "",
      loyalty: "Bronze"
    });
  };

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

        {/* FORM */}
        {showForm && (
          <div className="bg-white p-5 rounded shadow space-y-3">

            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              placeholder="Customer Name"
              className="border p-2 w-full"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 w-full"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 w-full"
            />

            <select
              name="loyalty"
              value={form.loyalty}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
            </select>

            <button 
              onClick={handleSubmit}
              className="bg-hijau text-white px-4 py-2 rounded"
            >
              Submit
            </button>

          </div>
        )}

        {/* TABLE */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Loyalty</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr key={c.customerId} className="border-t">
                  <td className="p-3">{c.customerId}</td>
                  <td className="p-3">{c.customerName}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium
                      ${c.loyalty === "Gold" && "bg-yellow-100 text-yellow-600"}
                      ${c.loyalty === "Silver" && "bg-gray-200 text-gray-600"}
                      ${c.loyalty === "Bronze" && "bg-orange-100 text-orange-600"}
                    `}>
                      {c.loyalty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}