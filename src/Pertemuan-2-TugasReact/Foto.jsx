export default function Foto({gambar}) {
  return (
    <img 
      src={gambar}
      width="150"
      style={{ borderRadius: "10px", marginBottom: "10px" }}
    />
  );
}