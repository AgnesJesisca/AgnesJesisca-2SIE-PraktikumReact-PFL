export default function Container({children}) {
  return (
    <div className="card">
      <h1>Portfolio React</h1>
      {children}
      <footer>
        <p>2026 - Agnes Jesisca</p>
      </footer>
    </div>
  );
}