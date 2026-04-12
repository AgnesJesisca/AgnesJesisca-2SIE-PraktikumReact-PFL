import React from 'react';
import { createRoot } from 'react-dom/client';
import DestinationList from "./DestinationList"; 
import "./tailwind.css"; 

createRoot(document.getElementById("root"))
  .render(
    <div>
      
      <DestinationList/>
    </div>
  );