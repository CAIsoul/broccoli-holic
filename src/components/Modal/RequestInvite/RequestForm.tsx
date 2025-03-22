import React, { useImperativeHandle, useRef, useState } from "react";
import CustomInput, { CustomInputRef } from "../../CustomInput/CustomInput";
import { validateFullName } from "../../../services/ValidateService";

interface RequestFormProps {
    ref: React.ForwardedRef<RequestInviteFormRef>,
}

interface RequestFormData {
    name?: string;
    email?: string;
    confirmEmail?: string;
}

export interface RequestInviteFormRef {
    getFormData: Function;
}

const RequestForm: React.FC<RequestFormProps> = ({ ref }) => {
    const nameInputRef = React.createRef<CustomInput>();
    const emailInputRef = React.createRef<CustomInput>();
    const confirmEmailInputRef = React.createRef<CustomInput>();

    useImperativeHandle(ref, () => ({
        getFormData: (): RequestFormData => ({
            name: nameInputRef.current?.getValue(),
            email: emailInputRef.current?.getValue(),
            confirmEmail: confirmEmailInputRef.current?.getValue(),
        }),
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
                    customValidator={(val: string) => validateFullName(val)}
                />
                <CustomInput ref={emailInputRef}
                    type='email'
                    id='email'
                    name='email'
                    placeholder="Email"
                    value=''
                />
                <CustomInput ref={confirmEmailInputRef}
                    type='email'
                    id='confirmEmail'
                    name='confirmEmail'
                    placeholder="Confirm email"
                    value=''

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