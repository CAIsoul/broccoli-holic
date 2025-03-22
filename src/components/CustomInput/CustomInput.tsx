import React, { ForwardedRef } from "react";
import { validateEmail } from "../../services/ValidateService";

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
    customValidator?: Function;
}

interface CustomInputState {
    value?: string;
    error?: string;
    isTyping: boolean;
}

class CustomInput extends React.Component<CustomInputProps, CustomInputState> {
    private customValidator: Function | undefined;
    private id: string;
    private type: string;
    private name: string;
    private placeholder: string;
    private pendingValidation: number | undefined;

    constructor(props: CustomInputProps) {
        super(props);

        const { type, id, name, value,
            placeholder = '', customValidator } = props;

        this.id = id;
        this.type = type;
        this.name = name;
        this.placeholder = placeholder;
        this.customValidator = customValidator;

        this.state = {
            value,
            error: '',
            isTyping: false,
        };
    }

    getValue() {
        return this.state.value;
    }

    triggerValidation() {

    }

    handleValueChange(evt: any) {
        const VALIDATION_DELAY = 500;
        const newVal = evt.target.value;
        this.setState({ value: newVal, isTyping: true });

        clearTimeout(this.pendingValidation);
        this.pendingValidation = setTimeout(
            () => {
                const errMsg = this.validateValue(newVal, this.type);
                this.setState({
                    error: errMsg,
                    isTyping: false,
                });
            },
            VALIDATION_DELAY
        );
    }

    validateValue(value: string | undefined, type: string): string {
        console.log('Custom input validating...');

        let errorMsg: string = '';

        if (value) {
            if (typeof this.customValidator === 'function') {
                errorMsg = this.customValidator(value);
            }
            else {
                let isValid = true;
                switch (type) {
                    case 'email':
                        isValid = validateEmail(value);
                        break;
                    default:
                        break;
                }

                errorMsg = isValid ? '' : `Invalid ${type}`;
            }
        }

        return errorMsg;
    }

    render() {
        const { value, error, isTyping } = this.state;

        return (
            <div style={styles.container}>
                <input style={styles.input}
                    type={this.type}
                    id={this.id}
                    name={this.name}
                    value={value}
                    placeholder={this.placeholder}
                    onChange={this.handleValueChange.bind(this)}
                />
                {!isTyping && error && <div style={styles.error}
                    className="errorMsg">
                    {error}
                </div>}
            </div>
        );
    }
}
const styles: any = {
    container: {
        height: '50px'
    },
    input: {
        display: 'block',
        width: '100%',
        height: '35px',
        boxSizing: 'border-box'
    },
    error: {
        height: '15px',
        lineHeight: '15px',
        fontSize: '10px',
        color: 'red'
    }
}

export default CustomInput;