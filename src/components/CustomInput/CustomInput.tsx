import React from "react";
import { validateEmail } from "../../services/ValidateService";
import { ValidationItem } from "../../shared/models/Validation";

import './CustomInput.scss';

export interface CustomInputRef {
    getValue: Function;
    triggerValidation: Function;
}

interface CustomInputProps {
    type: string;
    id: string;
    name: string;
    value?: string;
    placeholder?: string;
    isRequired?: boolean;
    extraValidators?: ValidationItem[];
}

interface CustomInputState {
    value: string;
    error: string;
    isTyping: boolean;
}

export const DEFAULT_VALIDATORS = {
    REQUIRED: {
        name: 'required',
        validator: (val: string) => val !== '',
        error: 'Required',
        level: 5,
    },
    EMAIL_FORMAT: {
        name: 'emailformat',
        validator: (val: string) => !val || validateEmail(val),
        error: 'Invalid email',
        level: 1,
    }
}

class CustomInput extends React.Component<CustomInputProps, CustomInputState> {
    private activeValidators: ValidationItem[];
    private id: string;
    private type: string;
    private name: string;
    private placeholder: string;
    private pendingValidation: any;

    constructor(props: CustomInputProps) {
        super(props);

        const { type, id, name, value = '', isRequired = false,
            placeholder = '', extraValidators = [] } = props;

        this.id = id;
        this.type = type;
        this.name = name;
        this.placeholder = placeholder;
        this.activeValidators = this.initValidators(type, isRequired, extraValidators);

        this.state = {
            value,
            error: '',
            isTyping: false,
        };
    }

    /**
     * Init validators for this custom input.
     *
     * @param {string} type
     * @param {boolean} [isRequired=false]
     * @param {ValidationItem[]} [extraValidators=[]]
     * @return {*}  {ValidationItem[]}
     * @memberof CustomInput
     */
    initValidators(
        type: string,
        isRequired: boolean = false,
        extraValidators: ValidationItem[] = []): ValidationItem[] {
        const validators = [];

        validators.push(...extraValidators);

        if (isRequired) {
            validators.push(DEFAULT_VALIDATORS.REQUIRED);
        }

        switch (type) {
            case 'email':
                validators.push(DEFAULT_VALIDATORS.EMAIL_FORMAT);
                break;
            default:
                break;
        }

        return validators;
    }

    getValue() {
        return this.state.value;
    }

    /**
     * Actively trigger validation for all levels.
     *
     * @return {*}  {boolean}
     * @memberof CustomInput
     */
    triggerValidation(): boolean {
        const errMsg = this.validateValue(this.state.value, 5);
        this.setState({ error: errMsg });

        return errMsg === '';
    }

    /**
     * Handle input value change event.
     *
     * @param {*} evt
     * @memberof CustomInput
     */
    handleValueChange(evt: any) {
        const VALIDATION_DELAY = 800;
        const newVal = evt.target.value;
        this.setState({ value: newVal, isTyping: true });

        clearTimeout(this.pendingValidation);
        this.pendingValidation = setTimeout(
            () => {
                // Only for level 1 validation
                const errMsg = this.validateValue(newVal, 1);
                this.setState({
                    error: errMsg,
                    isTyping: false,
                });
            },
            VALIDATION_DELAY
        );
    }

    /**
     * Validate given value.
     *
     * @param {string} value
     * @param {number} [level=5] ignore validators with higher level
     * @return {*}  {string}
     * @memberof CustomInput
     */
    validateValue(value: string, level: number = 5): string {
        return this.activeValidators.find(v => v.level <= level && !v.validator(value))?.error ?? '';
    }

    render() {
        const { value, error, isTyping } = this.state;
        const showError = !isTyping && error;

        return (
            <div className={`custom-input ${showError ? 'highlight-error' : ''}`}>
                <input
                    type={this.type}
                    id={this.id}
                    name={this.name}
                    value={value}
                    placeholder={this.placeholder}
                    onChange={this.handleValueChange.bind(this)}
                />
                {showError && <div className="error-msg">
                    {error}
                </div>}
            </div>
        );
    }
}

export default CustomInput;