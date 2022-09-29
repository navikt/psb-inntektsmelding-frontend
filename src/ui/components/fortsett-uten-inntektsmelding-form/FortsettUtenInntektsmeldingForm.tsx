/* eslint-disable jsx-a11y/label-has-associated-control */
import { Alert, Heading } from '@navikt/ds-react';
import { Box, Margin } from '@navikt/ft-plattform-komponenter';
import { RadioGroupPanel, TextArea } from '@navikt/k9-form-utils';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import ContainerContext from '../../../context/ContainerContext';
import Aksjonspunkt from '../../../types/Aksjonspunkt';
import AksjonspunktRequestPayload from '../../../types/AksjonspunktRequestPayload';
import { Kode, TilstandBeriket } from '../../../types/KompletthetData';
import { skalVurderes } from '../../../util/utils';
import styles from './fortsettUtenInntektsMeldingForm.less';

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
    const { arbeidsforhold, readOnly } = React.useContext(ContainerContext);

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
    const arbeidsgivereMedManglendeInntektsmelding = tilstand.status.filter((s) => s.status !== 'MOTTATT');

    let arbeidsgivereString = '';
    const formatArbeidsgiver = (arbeidsgiver) =>
        `${arbeidsforhold[arbeidsgiver.arbeidsgiver]?.navn} (${arbeidsgiver.arbeidsforhold})`;
    arbeidsgivereMedManglendeInntektsmelding.forEach(({ arbeidsgiver }, index) => {
        if (index === 0) {
            arbeidsgivereString = formatArbeidsgiver(arbeidsgiver);
        } else if (index === arbeidsgivereMedManglendeInntektsmelding.length - 1) {
            arbeidsgivereString = `${arbeidsgivereString} og ${formatArbeidsgiver(arbeidsgiver)}`;
        } else {
            arbeidsgivereString = `${arbeidsgivereString}, ${formatArbeidsgiver(arbeidsgiver)}`;
        }
    });

    const radios = {
        '9069': [
            {
                value: Kode.FORTSETT,
                label: `Ja, bruk A-inntekt for ${arbeidsgivereString}`,
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
                label: `Ja, bruk A-inntekt for ${arbeidsgivereString}`,
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
                    <Heading className={styles.fortsettUtenInntektsmelding__radiogroupHeading} level="3" size="xsmall">
                        Kan du gå videre uten inntektsmelding?
                    </Heading>
                    <Alert className={styles.fortsettUtenInntektsmelding__radiogroupAlert} variant="info" size="medium">
                        <ul>
                            <li>
                                A-inntekt benyttes <span className={styles.radiogroupAlert__emphasize}>kun</span> for de
                                arbeidsgiverne/arbeidsforholdene vi mangler inntektsmelding fra.
                            </li>
                            <li>
                                Refusjon i inntektsmeldinger vil alltid utbetales til arbeidsgiver. Evt. mellomlegg
                                utbetales direkte til søker.
                            </li>
                        </ul>
                    </Alert>
                    <div className={styles.fortsettUtenInntektsmelding__radiogroup}>
                        <RadioGroupPanel
                            name={beslutningFieldName}
                            question="Kan du gå videre uten inntektsmelding?"
                            radios={radios[aksjonspunktKode]}
                            disabled={readOnly && !redigeringsmodus}
                            validators={{
                                paakrevd: (v) => (!v ? 'Du må oppgi en verdi ' : null),
                            }}
                        />
                    </div>
                    <>
                        {skalViseBegrunnelse && (
                            <TextArea
                                name={begrunnelseFieldName}
                                label={
                                    <>
                                        <label htmlFor={begrunnelseId}>Begrunnelse</label>
                                        {fortsettUtenInntektsmelding === Kode.FORTSETT && (
                                            <div className={styles['fortsettUtenInntektsmelding__begrunnelse-subtext']}>
                                                Vi benytter opplysninger fra A-inntekt for alle arbeidsgivere vi ikke
                                                har mottatt inntektsmelding fra. Gjør en vurdering av hvorfor du
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
                                validators={{ paakrevd: (v) => (!v ? 'Du må fylle inn en verdi' : null) }}
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
