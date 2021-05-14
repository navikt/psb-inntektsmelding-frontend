import { Hovedknapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import TextArea from '../../form/TextArea';
import Box, { Margin } from '../box/Box';

interface FortsettUtenInntektsmeldingFormState {
    begrunnelse: string;
}

interface FortsettUtenInntektsmeldingFormProps {
    onSubmit: (data: FortsettUtenInntektsmeldingFormState) => void;
}

const FortsettUtenInntektsmeldingForm = ({ onSubmit }: FortsettUtenInntektsmeldingFormProps) => {
    const formMethods = useForm({});
    const { handleSubmit, watch, register } = formMethods;
    const fortsettUtenInntektsmelding = watch('fortsettUtenInntektsmelding', false);

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={() => handleSubmit(onSubmit)}>
                <Checkbox
                    name="fortsettUtenInntektsmelding"
                    label="Fortsett uten inntektsmelding"
                    {...register('fortsettUtenInntektsmelding')}
                />

                {fortsettUtenInntektsmelding && (
                    <Box marginTop={Margin.medium}>
                        <TextArea
                            name="begrunnelse"
                            label="Begrunnelse"
                            validators={{ something: (v) => (!v ? 'Du må fylle inn en verdi' : null) }}
                        />
                    </Box>
                )}
                <Box marginTop={Margin.large}>
                    <Hovedknapp disabled={!fortsettUtenInntektsmelding}>Lagre</Hovedknapp>
                </Box>
            </form>
        </FormProvider>
    );
};

export default FortsettUtenInntektsmeldingForm;
