import React from 'react';
import cl from 'classnames';
import { Period } from '@navikt/k9-period-utils';
import { Box, Margin } from '@navikt/k9-react-components';
import Alertstripe from 'nav-frontend-alertstriper';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import ContainerContext from '../../../context/ContainerContext';
import { Kompletthet } from '../../../types/KompletthetData';
import InntektsmeldingListeHeading from '../inntektsmelding-liste-heading/InntektsmeldingListeHeading';
import InntektsmeldingListe from '../inntektsmelding-liste/InntektsmeldingListe';
import PeriodList from '../period-list/PeriodList';
import styles from './kompletthetsoversikt.less';
import { finnAktivtAksjonspunkt } from '../../../util/utils';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
    onFormSubmit: ({
        begrunnelse,
        periode,
        beslutning,
        kode,
    }: {
        begrunnelse: string;
        periode: Period;
        beslutning: string;
        kode: string;
    }) => void;
}

const Kompletthetsoversikt = ({ kompletthetsoversikt, onFormSubmit }: KompletthetsoversiktProps): JSX.Element => {
    const { aksjonspunkter } = React.useContext(ContainerContext);
    const { tilstand: tilstander } = kompletthetsoversikt;
    const periods = tilstander.map(({ periode }) => periode);
    const statuses = tilstander.map(({ status }) => status);
    const aktivtAksjonspunkt = finnAktivtAksjonspunkt(aksjonspunkter);

    return (
        <div className={styles.kompletthet}>
            <h1 className={styles.kompletthet__mainHeading}>Inntektsmelding</h1>
            <h2 className={styles.kompletthet__subHeading}>Opplysninger til beregning</h2>
            {aktivtAksjonspunkt && (
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
                    tilstander={tilstander}
                    listHeadingRenderer={() => <InntektsmeldingListeHeading />}
                    listItemRenderer={(period: Period) => (
                        <InntektsmeldingListe status={statuses[periods.indexOf(period)]} />
                    )}
                    onFormSubmit={onFormSubmit}
                />
            </Box>
        </div>
    );
};

export default Kompletthetsoversikt;
