import type { InputHTMLAttributes, ReactNode } from "react";
import "./FormField.scss";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  error?: string;
}


export default function FormField({ label, icon, error, id, ...rest }: FormFieldProps) {
  const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="hs-form-field">
      <label htmlFor={fieldId}>
        {label} {icon && <span className="hs-form-field__icon">{icon}</span>}
      </label>
      <input id={fieldId} {...rest} />
      {error && <span className="hs-form-field__error">{error}</span>}
    </div>
  );
}
