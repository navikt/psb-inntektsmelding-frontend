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

export enum FieldName {
    FORTSETT_UTEN_INNTEKTSMELDING = 'fortsettUtenInntektsmelding',
    BEGRUNNELSE = 'begrunnelse',
}

const FortsettUtenInntektsmeldingForm = ({ onSubmit }: FortsettUtenInntektsmeldingFormProps) => {
    const formMethods = useForm({});
    const { handleSubmit, watch, register } = formMethods;
    const fortsettUtenInntektsmelding = watch(FieldName.FORTSETT_UTEN_INNTEKTSMELDING, false);

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={() => handleSubmit(onSubmit)}>
                <Checkbox
                    name={FieldName.FORTSETT_UTEN_INNTEKTSMELDING}
                    label="Fortsett uten inntektsmelding"
                    {...register(FieldName.FORTSETT_UTEN_INNTEKTSMELDING)}
                />

                {fortsettUtenInntektsmelding && (
                    <Box marginTop={Margin.medium}>
                        <TextArea
                            name={FieldName.BEGRUNNELSE}
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
