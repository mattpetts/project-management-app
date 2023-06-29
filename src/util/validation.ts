// Validation
export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validatebaleInput: Validatable) {
    let isValid = true;
    if (validatebaleInput.required) {
        isValid = isValid && validatebaleInput.value.toString().trim().length !== 0
    }

    if (validatebaleInput.minLength != null && typeof validatebaleInput.value === 'string') {
        isValid = isValid && validatebaleInput.value.length >= validatebaleInput.minLength
    }

    if (validatebaleInput.maxLength != null && typeof validatebaleInput.value === 'string') {
        isValid = isValid && validatebaleInput.value.length <= validatebaleInput.maxLength
    }

    if (validatebaleInput.min != null && typeof validatebaleInput.value === 'number') {
        isValid = isValid && validatebaleInput.value >= validatebaleInput.min
    }

    if (validatebaleInput.max != null && typeof validatebaleInput.value === 'number') {
        isValid = isValid && validatebaleInput.value <= validatebaleInput.max
    }

    return isValid;
}