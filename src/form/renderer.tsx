// FormRenderer.tsx
import React from "react";
import { Field, FormSchema } from "./schema";

type Values = Record<string, any>;
type Errors = Record<string, string | undefined>;

function isVisible(field: Field, values: Values): boolean {
  if (!field.visibleWhen) return true;
  const { field: dep, equals } = field.visibleWhen;
  return values[dep] === equals;
}

function validate(fields: Field[], values: Values): Errors {
  const errors: Errors = {};
  for (const f of fields) {
    if (!isVisible(f, values)) continue;
    if (f.required) {
      const v = values[f.id];
      const empty = v === undefined || v === null || (typeof v === "string" && v.trim() === "");
      if (empty) errors[f.id] = `${f.label ?? f.id} is required`;
    }
  }
  return errors;
}

type FieldProps = {
  field: Field;
  value: any;
  onChange: (id: string, v: any) => void;
  error?: string;
};

const TextInput: React.FC<FieldProps> = ({ field, value, onChange, error }) => (
  <div style={{ marginBottom: 12 }}>
    {field.label && <label><strong>{field.label}</strong></label>}
    <input
      type={(field as any).type === "number" ? "number" : (field as any).type}
      placeholder={(field as any).placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(field.id, (field as any).type === "number" ? Number(e.target.value) : e.target.value)}
      style={{ display: "block", width: "100%", padding: "8px", border: error ? "1px solid red" : "1px solid #ccc", borderRadius: 4 }}
    />
    {error && <small style={{ color: "red" }}>{error}</small>}
  </div>
);

const SelectInput: React.FC<FieldProps> = ({ field, value, onChange, error }) => {
  const opts = (field as any).options ?? [];
  return (
    <div style={{ marginBottom: 12 }}>
      {field.label && <label><strong>{field.label}</strong></label>}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(field.id, e.target.value)}
        style={{ display: "block", width: "100%", padding: "8px", border: error ? "1px solid red" : "1px solid #ccc", borderRadius: 4 }}
      >
        <option value="" disabled>{field.label ? `Select ${field.label}` : "Select..."}</option>
        {opts.map((o: any) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
};

const CheckboxInput: React.FC<FieldProps> = ({ field, value, onChange }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(field.id, e.target.checked)}
      />
      {field.label ?? field.id}
    </label>
  </div>
);

// Component registry
const registry: Record<string, React.FC<FieldProps>> = {
  text: TextInput,
  number: TextInput,
  date: TextInput,
  select: SelectInput,
  checkbox: CheckboxInput,
};

export const FormRenderer: React.FC<{
  schema: FormSchema;
  initialValues?: Values;
  onSubmit?: (values: Values) => void;
}> = ({ schema, initialValues, onSubmit }) => {
  const [values, setValues] = React.useState<Values>(initialValues ?? {});
  const [errors, setErrors] = React.useState<Errors>({});

  const handleChange = (id: string, v: any) => {
    setValues((prev) => ({ ...prev, [id]: v }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(schema.fields, values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSubmit?.(values);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 520 }}>
      {schema.fields.map((field) => {
        if (!isVisible(field, values)) return null;
        const Component = registry[field.type];
        
        if (!Component) return <div key={field.id}>Unknown field type: {field.type}</div>;
        return (
          <Component
            key={field.id}
            field={field}
            value={values[field.id]}
            onChange={handleChange}
            error={errors[field.id]}
          />
        );
      })}
      <button type="submit">Submit</button>
      <pre style={{ marginTop: 12, background: "#f7f7f7", padding: 8 }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </form>
  );
};