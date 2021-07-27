import { TextField } from "@material-ui/core";
import './style.css';

const CustomTextField = (props: any) => {
    const { formData, fullWidth = false, label, name, type = 'text' } = props;

    return (<TextField
        className="form-field"
        fullWidth={fullWidth}
        label={label}
        type={type}
        disabled={formData.isSubmitting}
        name={name}
        value={formData.values[name]}
        onChange={formData.handleChange}
        onBlur={formData.handleBlur}
        inputProps={{ 'data-testid': name }}
        error={formData.touched[name] && formData.errors && !!formData.errors[name]}
        helperText={formData.touched[name] && formData.errors && formData.errors[name]} />);
}
export default CustomTextField;