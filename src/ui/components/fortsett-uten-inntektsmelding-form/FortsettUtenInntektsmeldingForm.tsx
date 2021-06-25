import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Margin, TextArea } from '@navikt/k9-react-components';
import ControlledCheckbox from '../../form/Checkbox';
import ContainerContext from '../../../context/ContainerContext';

export interface FortsettUtenInntektsmeldingFormState {
    begrunnelse: string;
}

interface FortsettUtenInntektsmeldingFormProps {
    onSubmit: (data: FortsettUtenInntektsmeldingFormState) => void;
}

export enum FieldName {
    FORTSETT_UTEN_INNTEKTSMELDING = 'fortsettUtenInntektsmelding',
    BEGRUNNELSE = 'begrunnelse',
}

const FortsettUtenInntektsmeldingForm = ({ onSubmit }: FortsettUtenInntektsmeldingFormProps): JSX.Element => {
    const { readOnly } = React.useContext(ContainerContext);
    const formMethods = useForm({});
    const { handleSubmit, watch, control } = formMethods;
    const fortsettUtenInntektsmelding = watch(FieldName.FORTSETT_UTEN_INNTEKTSMELDING);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ControlledCheckbox
                    control={control}
                    name={FieldName.FORTSETT_UTEN_INNTEKTSMELDING}
                    label="Fortsett uten inntektsmelding"
                    disabled={readOnly}
                />

                {fortsettUtenInntektsmelding && (
                    <>
                        <Box marginTop={Margin.medium}>
                            <TextArea
                                name={FieldName.BEGRUNNELSE}
                                label="Begrunnelse"
                                validators={{ something: (v) => (!v ? 'Du må fylle inn en verdi' : null) }}
                            />
                        </Box>
                        <Box marginTop={Margin.large}>
                            <Hovedknapp disabled={!fortsettUtenInntektsmelding} mini>
                                Fortsett uten inntektsmelding
                            </Hovedknapp>
                        </Box>
                    </>
                )}
            </form>
        </FormProvider>
    );
};

export default FortsettUtenInntektsmeldingForm;
