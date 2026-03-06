import "./FormField.css";
interface FormFieldProps {
    placeholder: string;
    value?: string;
    onChange: (value: string) => void;
    type?: string;
}

export default function FormField(props: FormFieldProps) {
    const { placeholder, value, onChange, type = "text" } = props;
    return (
        <label className="form-field">
            <input type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </label>


    );
}