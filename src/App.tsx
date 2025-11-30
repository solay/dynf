import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormRenderer } from './form/renderer';
import { schema } from "./form/schema";
import { FormPreview } from './form/preview';

function App() {
  return (
    
    <div className="App">
          <FormRenderer
            schema={schema}
            onSubmit={(vals) => alert("Submitted:\n" + JSON.stringify(vals, null, 2))}
          />

          <FormPreview/>
    </div>
  );
}

export default App;
