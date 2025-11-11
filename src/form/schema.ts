// schema.ts
export type FieldBase = {
  id: string;
  label?: string;
  required?: boolean;
  visibleWhen?: { field: string; equals: any }; // simple condition
};

export type InputField = FieldBase & {
  type: "text" | "number" | "date";
  placeholder?: string;
};

export type SelectField = FieldBase & {
  type: "select";
  options: Array<{ label: string; value: string }>;
};

export type CheckboxField = FieldBase & {
  type: "checkbox";
};

export type Field = InputField | SelectField | CheckboxField;

export type FormSchema = {
  fields: Field[];
};

export const schema: FormSchema = {
  fields: [
    { id: "fullName", type: "text", label: "Full name", required: true, placeholder: "John Doe" },
    { id: "country", type: "select", label: "Country", required: true,
      options: [
        { label: "Germany", value: "DE" },
        { label: "Bulgaria", value: "BG" },
        { label: "USA", value: "US" }
      ]
    },
    { id: "newsletter", type: "checkbox", label: "Subscribe to newsletter?" },
    { id: "city", type: "text", label: "City", visibleWhen: { field: "country", equals: "DE" } },
    { id: "birthDate", type: "date", label: "Birth date" },
  ]
};