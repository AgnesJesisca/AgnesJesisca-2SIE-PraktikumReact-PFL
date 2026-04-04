import { useState } from "react";
import Background from "./Background";
import InputField from "./InputField"; // <--- Import lagi di sini

export default function BudgetForm() {
  const [nama, setNama] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [budget, setBudget] = useState("");
  const [tempat, setTempat] = useState("");
  const [menu, setMenu] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // LOGIKA HITUNG & VALIDASI (Tetap sama)
  let total = Number(jumlah) * Number(budget);
  if (menu === "Sultan") total *= 1.5;
  if (tempat === "Cafe") total += 10000;

  const errorNama = !nama ? "" : (/\d/.test(nama) ? "Tidak boleh angka" : (nama.length < 3 ? "Minimal 3 huruf" : ""));
  const errorJumlah = !jumlah ? "" : (Number(jumlah) <= 0 ? "Harus lebih dari 0" : "");
  const errorBudget = !budget ? "" : (Number(budget) < 10000 ? "Minimal Rp 10.000" : "");

  const isFormValid = nama && jumlah && budget && !errorNama && !errorJumlah && !errorBudget;

  return (
    <Background>
      <div className="flex flex-col items-center justify-center m-5 p-5 min-h-screen">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            🤑Budget Nongkrong🤑
          </h2>

          <div className="space-y-1">
            {/* PAKAI INPUTFIELD DI SINI */}
            <InputField
              label="Nama"
              type="text"
              value={nama}
              error={errorNama}
              onChange={(e) => { setNama(e.target.value); setIsSubmitted(false); }}
            />

            <InputField
              label="Jumlah Teman"
              type="number"
              value={jumlah}
              error={errorJumlah}
              onChange={(e) => { setJumlah(e.target.value); setIsSubmitted(false); }}
            />

            <InputField
              label="Budget /Orang"
              type="number"
              value={budget}
              error={errorBudget}
              onChange={(e) => { setBudget(e.target.value); setIsSubmitted(false); }}
            />

            {/* Dropdown tetap begini saja biar gak ribet */}
            <div className="py-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Tempat</label>
              <select onChange={(e) => {setTempat(e.target.value); setIsSubmitted(false);}} className="w-full p-2 border border-gray-300 rounded">
                <option value="">Pilih Tempat</option>
                <option value="Cafe">Cafe (+10rb)</option>
                <option value="Resto">Resto</option>
                <option value="StreetFood">StreetFood</option>
              </select>
            </div>

            <div className="py-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Menu</label>
              <select onChange={(e) => {setMenu(e.target.value); setIsSubmitted(false);}} className="w-full p-2 border border-gray-300 rounded">
                <option value="">Pilih Tipe Menu</option>
                <option value="Hemat">Hemat</option>
                <option value="Medium">Medium</option>
                <option value="Sultan">Sultan (x1.5)</option>
              </select>
            </div>
          </div>

          {isFormValid && (
            <button onClick={() => setIsSubmitted(true)} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded mt-4 transition-all">
              Submit
            </button>
          )}

          <div className="mt-6">
            {!isSubmitted ? (
              <div className="p-3 bg-red-100 text-red-700 text-sm rounded border-l-4 border-red-500">
                Silakan isi form dengan benar dan klik submit
              </div>
            ) : (
              <div className="p-4 bg-blue-100 text-blue-700 rounded border-l-4 border-blue-500">
                <p className="text-xs font-bold uppercase">Total Budget {nama}💸:</p>
                <p className="text-xl font-bold">Rp {total.toLocaleString("id-ID")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Background>
  );
}