import React from 'react';
import { Period } from '@navikt/period-utils';
import Box, { Margin } from '../box/Box';
import { Kompletthet } from '../../../types/KompletthetData';
import PeriodList from '../period-list/PeriodList';
import InntektsmeldingListe from '../inntektsmelding-liste/InntektsmeldingListe';
import InntektsmeldingListeHeading from '../inntektsmelding-liste-heading/InntektsmeldingListeHeading';
import ContainerContext from '../../../context/ContainerContext';
import FortsettUtenInntektsmeldingForm from '../fortsett-uten-inntektsmelding-form/FortsettUtenInntektsmeldingForm';
import AksjonspunktRequestPayload from '../../../types/AksjonspunktRequestPayload';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
}

const Kompletthetsoversikt = ({ kompletthetsoversikt }: KompletthetsoversiktProps) => {
    const { onFinished } = React.useContext(ContainerContext);
    const { tilstand } = kompletthetsoversikt;
    const periods = tilstand.map(({ periode }) => periode);
    const statuses = tilstand.map(({ status }) => status);
    return (
        <div className="kompletthet">
            <h1 style={{ fontSize: 22 }}>Inntektsmelding</h1>
            <FortsettUtenInntektsmeldingForm onSubmit={(data: AksjonspunktRequestPayload) => onFinished(data)} />
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
