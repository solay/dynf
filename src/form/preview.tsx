import { useSelector } from "react-redux";
import { getPerson } from "../store/slices/formSlice";

export const FormPreview: React.FC<{}> = () => {
  const person = useSelector(getPerson);
  
  return (
    <div>
      <pre style={{ marginTop: 12, background: "#f7f7f7", padding: 8 }}>
        {JSON.stringify(person, null, 2)}
      </pre>
    </div>
  );
};