import { Hovedknapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Margin } from '@navikt/k9-react-components';
import { RadioGroupPanel, TextArea } from '@navikt/k9-form-utils';
import { Period } from '@navikt/k9-period-utils';
import ContainerContext from '../../../context/ContainerContext';
import styles from './fortsettUtenInntektsMeldingForm.less';
import { finnAktivtAksjonspunkt } from '../../../util/utils';

export interface FortsettUtenInntektsmeldingFormState {
    begrunnelse: string;
    beslutning: string;
}

interface FortsettUtenInntektsmeldingFormProps {
    periode: Period;
    onSubmit: ({ begrunnelse, periode, beslutning, kode }) => void;
}

export enum FieldName {
    BESLUTNING = 'beslutning',
    BEGRUNNELSE = 'begrunnelse',
}

const FortsettUtenInntektsmeldingForm = ({ onSubmit, periode }: FortsettUtenInntektsmeldingFormProps): JSX.Element => {
    const { readOnly, aksjonspunkter } = React.useContext(ContainerContext);
    const formMethods = useForm({ mode: 'onTouched' });
    const { handleSubmit, watch } = formMethods;
    const fortsettUtenInntektsmelding = watch(FieldName.BESLUTNING);
    const aktivtAksjonspunkt = finnAktivtAksjonspunkt(aksjonspunkter);
    const aksjonspunktKode = aktivtAksjonspunkt?.definisjon?.kode;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit(({ begrunnelse, beslutning }) =>
                    onSubmit({ begrunnelse, periode, beslutning, kode: aksjonspunktKode })
                )}
            >
                <Panel className={styles.fortsettUtenInntektsmelding__panel}>
                    <RadioGroupPanel
                        name={FieldName.BESLUTNING}
                        question="Kan du gå videre uten inntektsmelding?"
                        radios={[
                            { value: 'fortsett', label: 'Ja, fortsett uten inntektsmelding' },
                            { value: 'purring', label: 'Nei, send purring med varsel om avslag' },
                        ]}
                        disabled={readOnly}
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
