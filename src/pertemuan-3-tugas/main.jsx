import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import "./tailwind.css";
import BudgetForm from "./BudgetForm";

createRoot(document.getElementById("root"))
  .render(
    <div>
      <BudgetForm/>
    </div>
  );