import "./BookingField.css";
import { useRef } from "react";

interface Option {
    value: string;
    label: string;
}

interface BookingFieldProps {
    label: string;
    icon?: React.ReactNode;
    value?: string;
    type: "select" | "date";
    onChange?: (value: string) => void;
    options?: Option[];
    placeholder?: string;
    displayValue?: string;

}

export default function BookingField(props: BookingFieldProps) {
    const { label, icon, value, type, onChange, options = [], placeholder = "Välj", displayValue } = props;

    const dateRef = useRef<HTMLInputElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        onChange?.(e.target.value);
    };

    const handleClick = () => {
        if (type === "date" && dateRef.current) {
            dateRef.current.showPicker?.();
            dateRef.current.focus();
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <label className="field" onClick={handleClick}>
            {icon && <div className="field-icon">{icon}</div>}
            <div className="field-text">
                <div className="field-label">{label}</div>
                <div className="field-value">{displayValue ?? (value || placeholder)}</div>
            </div>

            {type === "select" ? (
                <select
                    className="field-control"
                    value={value}
                    onChange={handleChange}
                    aria-label={label}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    ref={dateRef}
                    className="field-control"
                    type="date"
                    value={value}
                    onChange={handleChange}
                    aria-label={label}
                    min={today}
                />
            )}
        </label>
    );
}
