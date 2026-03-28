import Nama from "./Nama";
import NIM from "./NIM";
import Jurusan from "./Jurusan";
import Hobi from "./Hobi";
import Foto from "./Foto";
import Quote from "./Quote";

export default function BiodataDiri() {

  const data = {
    nama: "Agnes Jesisca",
    nim: "2457301005",
    jurusan: "Jurusan Teknologi Informasi (JTI)",
    hobi: "Nonton, Design, Art",
    foto: "img/profile.jpg",
    quote: "Stay calm and trust the process"
  };

  return (
    <div className="card">
      <h1>Biodata Diri</h1>

      <Foto gambar={data.foto}/>
      <Nama nama={data.nama}/>
      <NIM nim={data.nim}/>
      <Jurusan jurusan={data.jurusan}/>
      <Hobi hobi={data.hobi}/>
      <Quote quote={data.quote}/>

    </div>
  );
}