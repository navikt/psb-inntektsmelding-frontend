import React from 'react';
import { render } from 'react-dom';
import MainComponent from '../ui/MainComponent';

const renderAppInSuccessfulState = (appId: string) =>
    render(
        <MainComponent
            response={{
                tilstand: [
                    {
                        periode: '2028-01-01/2028-01-31',
                        status: [
                            {
                                arbeidsgiver: {
                                    arbeidsgiver: '123456789',
                                    arbeidsforhold: null,
                                },
                                status: 'MOTTATT',
                                journalpostId: '1234567',
                            },
                            {
                                arbeidsgiver: {
                                    arbeidsgiver: '234567890',
                                    arbeidsforhold: null,
                                },
                                status: 'MANGLER',
                                journalpostId: '2345678',
                            },
                        ],
                    },
                    {
                        periode: '2028-02-01/2028-02-10',
                        status: [
                            {
                                arbeidsgiver: {
                                    arbeidsgiver: '123456789',
                                    arbeidsforhold: null,
                                },
                                status: 'MANGLER',
                                journalpostId: '1234567',
                            },
                            {
                                arbeidsgiver: {
                                    arbeidsgiver: '234567890',
                                    arbeidsforhold: null,
                                },
                                status: 'MOTTATT',
                                journalpostId: '2345678',
                            },
                        ],
                    },
                ],
            }}
        />,
        document.getElementById(appId)
    );

export default {
    renderAppInSuccessfulState,
};
