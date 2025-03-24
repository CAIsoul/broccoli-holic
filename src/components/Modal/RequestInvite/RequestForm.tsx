import React, { useImperativeHandle } from "react";
import CustomInput from "../../CustomInput/CustomInput";
import { validateFullName } from "../../../services/ValidateService";

interface RequestFormProps {
    ref: React.ForwardedRef<RequestInviteFormRef>,
}

interface RequestFormData {
    name: string;
    email: string;
    confirmEmail: string;
    allValid: boolean;
}

export interface RequestInviteFormRef {
    getFormData: () => RequestFormData;
}

const ERR_MSG = {
    NAME_LENGTH: 'Should include at least 3 characters',
    EMAIL_UNMATCH: 'Confirm email does not match',
};

const RequestForm: React.FC<RequestFormProps> = ({ ref }) => {
    const nameInputRef = React.createRef<CustomInput>();
    const emailInputRef = React.createRef<CustomInput>();
    const confirmEmailInputRef = React.createRef<CustomInput>();

    useImperativeHandle(ref, () => ({
        getFormData: (): RequestFormData => {
            const isNameValid = nameInputRef.current?.triggerValidation();
            const isEmailValid = emailInputRef.current?.triggerValidation();
            const isConfirmEmailValid = confirmEmailInputRef.current?.triggerValidation();
            return {
                name: nameInputRef.current?.getValue() ?? '',
                email: emailInputRef.current?.getValue() ?? '',
                confirmEmail: confirmEmailInputRef.current?.getValue() ?? '',
                allValid: Boolean(isNameValid && isEmailValid && isConfirmEmailValid),
            }
        },
    }));

    return (
        <>
            <form style={styles.form}>
                <CustomInput ref={nameInputRef}
                    type='text'
                    id='name'
                    name='name'
                    placeholder="Full name"
                    value=''
                    isRequired={true}
                    extraValidators={[
                        {
                            name: 'nameLength',
                            validator: (val: string) => !val || validateFullName(val, false),
                            error: ERR_MSG.NAME_LENGTH,
                            level: 1,
                        }
                    ]}
                />
                <CustomInput ref={emailInputRef}
                    type='email'
                    id='email'
                    name='email'
                    placeholder="Email"
                    value=''
                    isRequired={true}
                    extraValidators={[
                        {
                            // A workaround to trigger validation on related fields
                            name: 'triggerRelated',
                            validator: () => {
                                const ref = confirmEmailInputRef.current;
                                if (ref?.getValue()) {
                                    confirmEmailInputRef.current?.triggerValidation();
                                }
                                return true;
                            },
                            error: '',
                            level: 1,
                        }
                    ]}
                />
                <CustomInput ref={confirmEmailInputRef}
                    type='email'
                    id='confirmEmail'
                    name='confirmEmail'
                    placeholder="Confirm email"
                    value=''
                    isRequired={true}
                    extraValidators={[
                        {
                            name: 'matchCheck',
                            validator: (val: string) => !val || emailInputRef.current?.getValue() === val,
                            error: ERR_MSG.EMAIL_UNMATCH,
                            level: 1,
                        }
                    ]}
                />
            </form>
        </>
    );
};

const styles: any = {
    form: {
        display: 'block',
        width: '100%'
    },
};

export default RequestForm;