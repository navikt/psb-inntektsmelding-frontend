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
        <div className="kompletthet">
            <h1 style={{ fontSize: 22 }}>Inntektsmelding</h1>
            {visFortsettKnapp && (
                <>
                    <Box marginBottom={Margin.large}>
                        <Alertstripe type="advarsel" className={styles.alertstripe}>
                            {`Inntektsmelding mangler for en eller flere arbeidsgivere i
                        ${periodestring(perioderSomManglerInntektsmelding)}. TODO: Beskrive rutine`}
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
