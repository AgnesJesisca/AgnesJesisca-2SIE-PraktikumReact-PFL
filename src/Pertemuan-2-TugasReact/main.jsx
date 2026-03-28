import { createRoot } from "react-dom/client";
import Container from "./Container";
import BiodataDiri from "./BiodataDiri";
import "./custom.css";

createRoot(document.getElementById("root"))
.render(
  <Container>
    <BiodataDiri />
  </Container>
);