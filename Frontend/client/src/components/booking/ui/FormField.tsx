import "./FormField.css";
interface FormFieldProps {
    placeholder: string;
}

export default function FormField(props: FormFieldProps) {
    const { placeholder } = props;
    return (
        <label className="form-field">
            <input type="text" placeholder={placeholder}/>
        </label>

        
    );
}