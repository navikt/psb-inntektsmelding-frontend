import React from 'react';
import { Period } from '@navikt/period-utils';
import { Kompletthet as KompletthetsData } from '../types/KompletthetData';
import { Kompletthet as KompletthetResponse } from '../types/KompletthetResponse';

interface MainComponentProps {
    response: KompletthetResponse;
}

function initKompletthetsdata({ tilstand }: KompletthetResponse): KompletthetsData {
    return {
        tilstand: tilstand.map(({ periode, status }) => {
            const [fom, tom] = periode.split('/');
            return {
                periode: new Period(fom, tom),
                status,
            };
        }),
    };
}

const MainComponent = ({ response }: MainComponentProps) => {
    const { tilstand } = initKompletthetsdata(response);
    return (
        <div className="kompletthet">
            <ul>
                {tilstand.map((kompletthetstilstand) => {
                    const { periode } = kompletthetstilstand;
                    return (
                        <li key={JSON.stringify(periode)}>
                            <p>{periode.prettifyPeriod()}</p>
                            {kompletthetstilstand.status.map(({ arbeidsgiver, journalpostId, status }) => {
                                return (
                                    <p key={journalpostId}>
                                        {JSON.stringify(arbeidsgiver)}
                                        {status}
                                        {journalpostId}
                                    </p>
                                );
                            })}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MainComponent;
