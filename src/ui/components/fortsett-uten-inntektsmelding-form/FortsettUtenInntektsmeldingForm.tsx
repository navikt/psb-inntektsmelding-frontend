/* eslint-disable jsx-a11y/label-has-associated-control */
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Box, Margin } from '@navikt/k9-react-components';
import { RadioGroupPanel, TextArea } from '@navikt/k9-form-utils';
import ContainerContext from '../../../context/ContainerContext';
import styles from './fortsettUtenInntektsMeldingForm.less';
import Aksjonspunkt from '../../../types/Aksjonspunkt';
import { Kode, TilstandBeriket } from '../../../types/KompletthetData';
import AksjonspunktRequestPayload from '../../../types/AksjonspunktRequestPayload';
import { skalVurderes } from '../../../util/utils';

export interface FortsettUtenInntektsmeldingFormState {
    begrunnelse: string;
    beslutning: string;
}

interface FortsettUtenInntektsmeldingFormProps {
    tilstand: TilstandBeriket;
    onSubmit: (payload: AksjonspunktRequestPayload) => void;
    redigeringsmodus: boolean;
    aksjonspunkt: Aksjonspunkt;
    setRedigeringsmodus: (state: boolean) => void;
    formMethods: UseFormReturn;
    harFlereTilstanderTilVurdering: boolean;
}

const FortsettUtenInntektsmeldingForm = ({
    onSubmit,
    tilstand,
    redigeringsmodus,
    setRedigeringsmodus,
    aksjonspunkt,
    formMethods,
    harFlereTilstanderTilVurdering,
}: FortsettUtenInntektsmeldingFormProps): JSX.Element => {
    const { readOnly } = React.useContext(ContainerContext);

    const { handleSubmit, watch } = formMethods;
    const { beslutningFieldName, begrunnelseFieldName } = tilstand;
    const beslutningId = `beslutning-${tilstand.periodeOpprinneligFormat}`;
    const begrunnelseId = `begrunnelse-${tilstand.periodeOpprinneligFormat}`;
    const fortsettUtenInntektsmelding = watch(beslutningFieldName);
    const aksjonspunktKode = aksjonspunkt?.definisjon?.kode;
    const vis = ((skalVurderes(tilstand) && !readOnly) || redigeringsmodus) && aksjonspunkt && tilstand.tilVurdering;
    const skalViseBegrunnelse = !(aksjonspunktKode === '9069' && fortsettUtenInntektsmelding !== Kode.FORTSETT);
    const fortsettKnappTekstFunc = {
        '9069': (erFortsett: boolean) =>
            erFortsett ? 'Fortsett uten inntektsmelding' : 'Send purring med varsel om avslag',
        '9071': (erFortsett: boolean) => (erFortsett ? 'Fortsett uten inntektsmelding' : 'Avslå periode'),
    };

    const radios = {
        '9069': [
            {
                value: Kode.FORTSETT,
                label: 'Ja, bruk A-inntekt for alle arbeidsgivere',
                id: `${beslutningId}${Kode.FORTSETT}`,
            },
            {
                value: Kode.MANGLENDE_GRUNNLAG,
                label: 'Nei, send purring med varsel om avslag',
                id: `${beslutningId}${Kode.MANGLENDE_GRUNNLAG}`,
            },
        ],
        '9071': [
            {
                value: Kode.FORTSETT,
                label: 'Ja, bruk A-inntekt for alle arbeidsgivere',
                id: `${beslutningId}${Kode.FORTSETT}`,
            },
            {
                value: Kode.MANGLENDE_GRUNNLAG,
                label: 'Nei, avslå periode på grunn av manglende inntektsopplysninger',
                id: `${beslutningId}${Kode.MANGLENDE_GRUNNLAG}`,
            },
        ],
    };

    if (!vis) {
        return null;
    }

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit((data) =>
                    onSubmit({
                        '@type': aksjonspunktKode,
                        kode: aksjonspunktKode,
                        begrunnelse: skalViseBegrunnelse ? data[tilstand.begrunnelseFieldName] : null,
                        perioder: [
                            {
                                begrunnelse: skalViseBegrunnelse ? data[tilstand.begrunnelseFieldName] : null,
                                periode: tilstand.periodeOpprinneligFormat,
                                fortsett: data[tilstand.beslutningFieldName] === Kode.FORTSETT,
                                kode: aksjonspunktKode,
                            },
                        ],
                    })
                )}
            >
                <Panel className={styles.fortsettUtenInntektsmelding__panel}>
                    <RadioGroupPanel
                        name={beslutningFieldName}
                        question="Kan du gå videre uten inntektsmelding?"
                        radios={radios[aksjonspunktKode]}
                        disabled={readOnly && !redigeringsmodus}
                        validators={{
                            kanIkkeVelgeForrigeVerdi: (v) =>
                                v === tilstand.vurdering.kode
                                    ? 'Velg en annen verdi enn sist, eller avbryt redigering'
                                    : null,
                            something: (v) => (!v ? 'Du må oppgi en verdi ' : null),
                        }}
                    />
                    <>
                        {skalViseBegrunnelse && (
                            <TextArea
                                name={begrunnelseFieldName}
                                label={
                                    <>
                                        <label htmlFor={begrunnelseId}>Begrunnelse</label>
                                        {fortsettUtenInntektsmelding === Kode.FORTSETT && (
                                            <div className={styles['fortsettUtenInntektsmelding__begrunnelse-subtext']}>
                                                Vi benytter opplysninger fra A-inntekt for alle arbeidsgivere, også de
                                                vi har mottatt inntektsmelding fra. Gjør en vurdering av hvorfor du
                                                benytter A-inntekt for å fastsette grunnlaget etter § 8-28.
                                            </div>
                                        )}
                                        {fortsettUtenInntektsmelding === Kode.MANGLENDE_GRUNNLAG && (
                                            <div className={styles['fortsettUtenInntektsmelding__begrunnelse-subtext']}>
                                                Skriv begrunnelse for hvorfor du ikke kan benytte opplysninger fra
                                                A-inntekt for å fastsette grunnlaget, og avslå saken etter
                                                folketrygdloven §§ 21-3 og 8-28.
                                            </div>
                                        )}
                                    </>
                                }
                                validators={{ something: (v) => (!v ? 'Du må fylle inn en verdi' : null) }}
                                id={begrunnelseId}
                            />
                        )}
                        <Box marginTop={Margin.large}>
                            <div className={styles.fortsettUtenInntektsmelding__knapper}>
                                {!harFlereTilstanderTilVurdering && (
                                    <Hovedknapp mini>
                                        {fortsettKnappTekstFunc[aksjonspunktKode](
                                            fortsettUtenInntektsmelding === Kode.FORTSETT
                                        )}
                                    </Hovedknapp>
                                )}
                                {redigeringsmodus && (
                                    <Knapp mini onClick={() => setRedigeringsmodus(false)}>
                                        Avbryt redigering
                                    </Knapp>
                                )}
                            </div>
                        </Box>
                    </>
                </Panel>
            </form>
        </FormProvider>
    );
};

export default FortsettUtenInntektsmeldingForm;
