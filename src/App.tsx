import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormRenderer } from './form/renderer';
import { schema } from "./form/schema";

function App() {
  return (
    <div className="App">

          <FormRenderer
            schema={schema}
            onSubmit={(vals) => alert("Submitted:\n" + JSON.stringify(vals, null, 2))}
          />

    </div>
  );
}

export default App;
