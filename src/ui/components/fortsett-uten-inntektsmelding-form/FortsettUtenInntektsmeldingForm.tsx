import { Hovedknapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
// RadioGroupPanel skal hentes fra k9-form-utils
import { Box, Margin, TextArea, RadioGroupPanel } from '@navikt/k9-react-components';
import { Period } from '@navikt/k9-period-utils';
import ContainerContext from '../../../context/ContainerContext';
import styles from './fortsettUtenInntektsMeldingForm.less';

export interface FortsettUtenInntektsmeldingFormState {
    begrunnelse: string;
    beslutning: string;
}

interface FortsettUtenInntektsmeldingFormProps {
    periode: Period;
    onSubmit: ({ begrunnelse, periode, beslutning }) => void;
}

export enum FieldName {
    BESLUTNING = 'beslutning',
    BEGRUNNELSE = 'begrunnelse',
}

const FortsettUtenInntektsmeldingForm = ({ onSubmit, periode }: FortsettUtenInntektsmeldingFormProps): JSX.Element => {
    const { readOnly } = React.useContext(ContainerContext);
    const formMethods = useForm({});
    const { handleSubmit, watch, control } = formMethods;
    const fortsettUtenInntektsmelding = watch(FieldName.BESLUTNING);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit(({ begrunnelse, beslutning }) => onSubmit({ begrunnelse, periode, beslutning }))}
            >
                <Panel className={styles.fortsettUtenInntektsmelding__panel}>
                    <Controller
                        control={control}
                        name={FieldName.BESLUTNING}
                        render={({ onChange }) => (
                            <RadioGroupPanel
                                name={FieldName.BESLUTNING}
                                question="Kan du gå videre uten inntektsmelding?"
                                radios={[
                                    { value: 'fortsett', label: 'Ja, fortsett uten inntektsmelding' },
                                    { value: 'purring', label: 'Nei, send purring med varsel om avslag' },
                                ]}
                                onChange={(e) => onChange(e)}
                            />
                        )}
                    />
                    <>
                        {fortsettUtenInntektsmelding === 'fortsett' && (
                            <TextArea
                                name={FieldName.BEGRUNNELSE}
                                label="Begrunnelse"
                                validators={{ something: (v) => (!v ? 'Du må fylle inn en verdi' : null) }}
                            />
                        )}
                        <Box marginTop={Margin.large}>
                            <Hovedknapp disabled={!fortsettUtenInntektsmelding} mini>
                                {fortsettUtenInntektsmelding === 'purring'
                                    ? 'Send purring med varsel om avslag'
                                    : 'Fortsett uten inntektsmelding'}
                            </Hovedknapp>
                        </Box>
                    </>
                </Panel>
            </form>
        </FormProvider>
    );
};

export default FortsettUtenInntektsmeldingForm;
