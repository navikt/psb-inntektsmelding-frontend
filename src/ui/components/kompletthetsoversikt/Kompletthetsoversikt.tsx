import React from 'react';
import Box, { Margin } from '../box/Box';
import { Kompletthet } from '../../../types/KompletthetData';

interface KompletthetsoversiktProps {
    kompletthetsoversikt: Kompletthet;
}

const Kompletthetsoversikt = ({ kompletthetsoversikt }: KompletthetsoversiktProps) => {
    const { tilstand } = kompletthetsoversikt;
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

export default Kompletthetsoversikt;
