export default {
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
                    journalpostId: '1111',
                },
                {
                    arbeidsgiver: {
                        arbeidsgiver: '234567890',
                        arbeidsforhold: null,
                    },
                    status: 'MANGLER',
                    journalpostId: '2222',
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
                    journalpostId: '3333',
                },
                {
                    arbeidsgiver: {
                        arbeidsgiver: '234567890',
                        arbeidsforhold: null,
                    },
                    status: 'MOTTATT',
                    journalpostId: '4444',
                },
            ],
        },
    ],
};
