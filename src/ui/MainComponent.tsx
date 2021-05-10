import { Period } from '@navikt/period-utils';
import React from 'react';
import { Kompletthet as KompletthetsData } from '../types/KompletthetData';
import { Kompletthet as KompletthetResponse } from '../types/KompletthetResponse';
import Box, { Margin } from './components/box/Box';

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
            <h1 style={{ fontSize: 22 }}>Kompletthet</h1>
            <Box marginTop={Margin.xLarge}>
                <ul>
                    {tilstand.map((kompletthetstilstand) => {
                        const { periode } = kompletthetstilstand;
                        return (
                            <li key={JSON.stringify(periode)} style={{ marginBottom: '3rem' }}>
                                <p>{periode.prettifyPeriod()}</p>
                                <div style={{ display: 'flex' }}>
                                    {kompletthetstilstand.status.map(({ arbeidsgiver, journalpostId, status }) => {
                                        return (
                                            <div
                                                key={journalpostId}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginRight: '4rem',
                                                }}
                                            >
                                                <p>Arbeidsgiver: {arbeidsgiver.arbeidsgiver}</p>
                                                <p>Status: {status}</p>
                                                <p>JournalpostId: {journalpostId}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </Box>
        </div>
    );
};

export default MainComponent;
