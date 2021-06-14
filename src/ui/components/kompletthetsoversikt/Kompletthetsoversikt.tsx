import { getHumanReadablePeriodString, Period } from '@navikt/k9-period-utils';
import Alertstripe from 'nav-frontend-alertstriper';
import React from 'react';
import { Box, Margin } from '@navikt/k9-react-components';
import ContainerContext from '../../../context/ContainerContext';
import { Kompletthet } from '../../../types/KompletthetData';
import FortsettUtenInntektsmeldingForm, {
    FortsettUtenInntektsmeldingFormState,
} from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import InntektsmeldingListeHeading from '../inntektsmelding-liste-heading/InntektsmeldingListeHeading';
import InntektsmeldingListe from '../inntektsmelding-liste/InntektsmeldingListe';
import PeriodList from '../period-list/PeriodList';
import WriteAccessBoundContent from '../write-access-bound-content/WriteAccessBoundContent';
import styles from './kompletthetsoversikt.less';
import tilstandManglerInntektsmeldingUtil from '../../../util/tilstandManglerInntektsmelding';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
    onFormSubmit: (data: FortsettUtenInntektsmeldingFormState) => void;
}

const periodestring = (perioder: Period[]) => {
    if (perioder.length > 1) {
        return `periodene ${getHumanReadablePeriodString(perioder)}`;
    }
    return `perioden ${getHumanReadablePeriodString(perioder)}`;
};

const Kompletthetsoversikt = ({ kompletthetsoversikt, onFormSubmit }: KompletthetsoversiktProps) => {
    const { visFortsettKnapp } = React.useContext(ContainerContext);
    const { tilstand } = kompletthetsoversikt;
    const periods = tilstand.map(({ periode }) => periode);
    const statuses = tilstand.map(({ status }) => status);
    const perioderSomManglerInntektsmelding = tilstand
        .filter(tilstandManglerInntektsmeldingUtil)
        .map(({ periode }) => periode);

    return (
        <div className={styles.kompletthet}>
            <h1 className={styles.kompletthet__mainHeading}>Inntektsmelding</h1>
            <h2 className={styles.kompletthet__subHeading}>Opplysninger til beregning</h2>
            {visFortsettKnapp && (
                <>
                    <Box marginBottom={Margin.large}>
                        <Alertstripe type="advarsel" className={styles.alertstripe}>
                            {`Inntektsmelding mangler for en eller flere arbeidsgivere i
                        ${periodestring(perioderSomManglerInntektsmelding)}. TODO: Beskrive rutine`}
                        </Alertstripe>
                    </Box>
                    <Box marginBottom={Margin.large}>
                        <Alertstripe type="info" className={styles.alertstripe}>
                            <ul className={styles.kompletthet__list}>
                                <li>
                                    Første fraværsdato i inntektsmeldingen må være 4 uker før eller etter
                                    skjæringstidspunktet for ytelsen.
                                </li>
                                <li>
                                    Arbeidsforholds-ID i inntektsmeldingen må være lik arbeidsforholds-ID i
                                    Aa-registeret.
                                </li>
                            </ul>
                        </Alertstripe>
                    </Box>
                    <WriteAccessBoundContent
                        contentRenderer={() => <FortsettUtenInntektsmeldingForm onSubmit={onFormSubmit} />}
                    />
                </>
            )}
            <Box marginTop={Margin.large}>
                <PeriodList
                    periods={periods}
                    listHeadingRenderer={() => <InntektsmeldingListeHeading />}
                    listItemRenderer={(period: Period) => (
                        <InntektsmeldingListe status={statuses[periods.indexOf(period)]} />
                    )}
                />
            </Box>
        </div>
    );
};

export default Kompletthetsoversikt;
