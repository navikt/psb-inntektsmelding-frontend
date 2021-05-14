import { getHumanReadablePeriodString, Period } from '@navikt/period-utils';
import Alertstripe from 'nav-frontend-alertstriper';
import React from 'react';
import ContainerContext from '../../../context/ContainerContext';
import AksjonspunktRequestPayload from '../../../types/AksjonspunktRequestPayload';
import { Kompletthet } from '../../../types/KompletthetData';
import Box, { Margin } from '../box/Box';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import InntektsmeldingListeHeading from '../inntektsmelding-liste-heading/InntektsmeldingListeHeading';
import InntektsmeldingListe from '../inntektsmelding-liste/InntektsmeldingListe';
import PeriodList from '../period-list/PeriodList';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
}

const periodestring = (perioder: Period[]) => {
    if (perioder.length > 1) {
        return `periodene ${getHumanReadablePeriodString(perioder)}`;
    }
    return `perioden ${getHumanReadablePeriodString(perioder)}`;
};

const Kompletthetsoversikt = ({ kompletthetsoversikt }: KompletthetsoversiktProps) => {
    const { onFinished } = React.useContext(ContainerContext);
    const { tilstand } = kompletthetsoversikt;
    const periods = tilstand.map(({ periode }) => periode);
    const statuses = tilstand.map(({ status }) => status);
    const perioderSomManglerInntektsmelding = tilstand
        .filter(({ status }) => status.some((s) => s.status === 'MANGLER'))
        .map(({ periode }) => periode);
    const harPerioderSomManglerInntektsmelding = perioderSomManglerInntektsmelding.length > 0;

    return (
        <div className="kompletthet">
            <h1 style={{ fontSize: 22 }}>Inntektsmelding</h1>
            {/* {harPerioderSomManglerInntektsmelding && ( */}
            <>
                <Box marginBottom={Margin.large}>
                    <Alertstripe type="advarsel">
                        {`Inntektsmelding mangler for en eller flere arbeidsgivere i
                        ${periodestring(perioderSomManglerInntektsmelding)}. TODO: Beskrive rutine`}
                    </Alertstripe>
                </Box>
                <FortsettUtenInntektsmeldingForm onSubmit={(data: AksjonspunktRequestPayload) => onFinished(data)} />
            </>
            {/* )} */}
            <Box marginTop={Margin.xLarge}>
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
