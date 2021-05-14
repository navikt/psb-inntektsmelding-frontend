import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useForm } from 'react-hook-form';
import TextArea from '../../form/TextArea';
import { Checkbox } from 'nav-frontend-skjema';

interface FortsettUtenInntektsmeldingFormState {
    begrunnelse: string;
}

interface FortsettUtenInntektsmeldingFormProps {
    onSubmit: (data: FortsettUtenInntektsmeldingFormState) => void;
}

const FortsettUtenInntektsmeldingForm = ({ onSubmit }: FortsettUtenInntektsmeldingFormProps) => {
    const { handleSubmit, watch } = useForm({});
    const fortsettUtenInntektsmelding = watch('fortsettUtenInntektsmelding');

    return (
        <form onSubmit={() => handleSubmit(onSubmit)}>
            <Checkbox name="fortsettUtenInntektsmelding" label="Fortsett uten inntektsmelding" />
            <TextArea
                name="begrunnelse"
                label="Begrunnelse"
                validators={{ something: (v) => (!v ? 'Du må fylle inn en verdi' : null) }}
            />
            <Hovedknapp disabled={!fortsettUtenInntektsmelding}>Lagre</Hovedknapp>
        </form>
    );
};

export default FortsettUtenInntektsmeldingForm;
