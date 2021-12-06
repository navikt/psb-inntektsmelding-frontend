import React, { useState } from 'react';
import cl from 'classnames';
import { Period } from '@navikt/k9-period-utils';
import { Box, Margin } from '@navikt/k9-react-components';
import Alertstripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Hovedknapp } from 'nav-frontend-knapper';
import { useForm } from 'react-hook-form';
import ContainerContext from '../../../context/ContainerContext';
import { Kode, Kompletthet, Tilstand } from '../../../types/KompletthetData';
import InntektsmeldingListeHeading from '../inntektsmelding-liste-heading/InntektsmeldingListeHeading';
import InntektsmeldingListe from '../inntektsmelding-liste/InntektsmeldingListe';
import PeriodList from '../period-list/PeriodList';
import styles from './kompletthetsoversikt.less';
import { finnAktivtAksjonspunkt, finnTilstanderSomRedigeres, finnTilstanderSomVurderes } from '../../../util/utils';
import FieldName from '../../../types/FieldName';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
    onFormSubmit: any;
}

const Kompletthetsoversikt = ({ kompletthetsoversikt, onFormSubmit }: KompletthetsoversiktProps): JSX.Element => {
    const { aksjonspunkter } = React.useContext(ContainerContext);
    const { tilstand: tilstander } = kompletthetsoversikt;

    const periods = tilstander.map(({ periode }) => periode);
    const statuses = tilstander.map(({ status }) => status);
    const aktivtAksjonspunkt = finnAktivtAksjonspunkt(aksjonspunkter);
    const forrigeAksjonspunkt = aksjonspunkter.sort((a, b) => Number(b.definisjon.kode) - Number(a.definisjon.kode))[0];
    const aksjonspunkt = aktivtAksjonspunkt || forrigeAksjonspunkt;
    const aksjonspunktKode = aksjonspunkt?.definisjon?.kode;

    const testTilstander = [...tilstander, ...tilstander]

    const tilstanderBeriket = testTilstander.map((tilstand) => {
        const [redigeringsmodus, setRedigeringsmodus] = useState(false);

        return {
            ...tilstand,
            redigeringsmodus,
            setRedigeringsmodus,
            begrunnelseFieldName: `${FieldName.BEGRUNNELSE}${tilstand.periodeOpprinneligFormat}`,
            beslutningFieldName: `${FieldName.BESLUTNING}${tilstand.periodeOpprinneligFormat}`,
        };
    });

    const reducer = (defaultValues, tilstand: Tilstand) => ({
        ...defaultValues,
        [`${FieldName.BEGRUNNELSE}${tilstand.periodeOpprinneligFormat}`]: tilstand?.begrunnelse || '',
        [`${FieldName.BESLUTNING}${tilstand.periodeOpprinneligFormat}`]: null,
    });
    const formMethods = useForm({
        mode: 'onTouched',
        defaultValues: tilstanderBeriket.reduce(reducer, {}),
    });
    const { handleSubmit, watch } = formMethods;

    const tilstanderTilVurdering = [
        ...finnTilstanderSomVurderes(tilstanderBeriket),
        ...finnTilstanderSomRedigeres(tilstanderBeriket),
    ];
    const harFlereTilstanderTilVurdering = tilstanderTilVurdering.length > 1;

    return (
        <div className={styles.kompletthet}>
            <h1 className={styles.kompletthet__mainHeading}>Inntektsmelding</h1>
            <h2 className={styles.kompletthet__subHeading}>Opplysninger til beregning</h2>
            {aksjonspunkt && (
                <>
                    <Box marginBottom={Margin.large}>
                        <Alertstripe type="advarsel" className={styles.alertstripe}>
                            Inntektsmelding mangler for en eller flere arbeidsgivere. Vurder om du kan fortsette
                            behandlingen uten inntektsmelding, og heller benytte opplysninger fra A-inntekt, for
                            arbeidsgiverne vi mangler inntektsmelding fra.
                            <ul className={cl(styles.kompletthet__list, styles['kompletthet--margin-top'])}>
                                <li>
                                    Hvis du går videre uten inntektsmelding fra en arbeidsgiver, bruker vi utelukkende
                                    opplysninger fra A-inntekt for arbeidsgiveren som vi mangler inntektsmelding fra for
                                    å beregne månedsinntekt etter § 8-28.
                                </li>
                                <li>
                                    Vi utbetaler alltid direkte til bruker for de arbeidsgiverne vi mangler
                                    inntektsmelding fra.
                                </li>
                            </ul>
                        </Alertstripe>
                    </Box>
                    <Box marginBottom={Margin.large}>
                        <Alertstripe type="info" className={styles.alertstripe}>
                            <Ekspanderbartpanel
                                tittel="Når kan du gå videre uten inntektsmelding?"
                                className={styles.kompletthet__info}
                            >
                                Du kan vurdere å gå videre uten inntektsmelding hvis:
                                <ul className={styles.kompletthet__list}>
                                    <li>
                                        Det er rapportert fast og regelmessig lønn de siste 3 månedene før
                                        skjæringstidspunktet. Merk at det er unntak fra dette hvis søker har 0 %
                                        stilling, har varierende arbeidstider eller annet.
                                    </li>
                                    <li>
                                        Måneden skjæringstidspunktet er i er innrapportert til A-inntekt. Hvis det er
                                        innrapportert lavere lønn enn foregående måneder, kan det tyde på at
                                        arbeidsgiver ikke lenger utbetaler lønn.
                                    </li>
                                </ul>
                                <div className={styles['kompletthet--margin-top']}>
                                    Du bør ikke gå videre uten inntektsmelding hvis:
                                </div>
                                <ul className={styles.kompletthet__list}>
                                    <li>
                                        Det er arbeidsforhold og frilansoppdrag i samme organisasjon (sjekk i
                                        Aa-registeret).
                                    </li>
                                    <li>
                                        Det er rapportert full lønn fra arbeidsgiver for måneden skjæringstidspunktet er
                                        i. Dette tyder på at arbeidsgiver forskutterer lønn.
                                    </li>
                                </ul>
                            </Ekspanderbartpanel>
                        </Alertstripe>
                    </Box>
                </>
            )}
            <Box marginTop={Margin.large}>
                <PeriodList
                    tilstander={tilstanderBeriket}
                    listHeadingRenderer={() => <InntektsmeldingListeHeading />}
                    listItemRenderer={(period: Period) => (
                        <InntektsmeldingListe status={statuses[periods.indexOf(period)]} />
                    )}
                    onFormSubmit={onFormSubmit}
                    aksjonspunkt={aksjonspunkt}
                    formMethods={formMethods}
                    harFlereTilstanderTilVurdering={harFlereTilstanderTilVurdering}
                />
            </Box>
            {harFlereTilstanderTilVurdering && (
                <Box marginTop={Margin.large}>
                    <form
                        onSubmit={handleSubmit((data) => {
                            const perioder = tilstanderBeriket.map((tilstand) => {
                                const skalViseBegrunnelse = !(
                                    aksjonspunktKode === '9069' && watch(tilstand.beslutningFieldName) !== Kode.FORTSETT
                                );
                                const begrunnelse = skalViseBegrunnelse ? data[tilstand.begrunnelseFieldName] : null;
                                return {
                                    begrunnelse,
                                    periode: tilstand.periodeOpprinneligFormat,
                                    fortsett: data[tilstand.beslutningFieldName] === Kode.FORTSETT,
                                    kode: aksjonspunktKode,
                                };
                            });
                            onFormSubmit({
                                '@type': aksjonspunktKode,
                                kode: aksjonspunktKode,
                                perioder,
                            });
                        })}
                    >
                        <Hovedknapp mini>Send inn</Hovedknapp>
                    </form>
                </Box>
            )}
        </div>
    );
};

export default Kompletthetsoversikt;
