import React from 'react';
import { Period } from '@navikt/period-utils';
import Box, { Margin } from '../box/Box';
import { Kompletthet } from '../../../types/KompletthetData';
import PeriodList from '../period-list/PeriodList';
import InntektsmeldingListe from '../inntektsmelding-liste/InntektsmeldingListe';
import InntektsmeldingListeHeading from '../inntektsmelding-liste-heading/InntektsmeldingListeHeading';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
}

const Kompletthetsoversikt = ({ kompletthetsoversikt }: KompletthetsoversiktProps) => {
    const { tilstand } = kompletthetsoversikt;
    const periods = tilstand.map(({ periode }) => periode);
    const statuses = tilstand.map(({ status }) => status);
    return (
        <div className="kompletthet">
            <h1 style={{ fontSize: 22 }}>Inntektsmelding</h1>
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
