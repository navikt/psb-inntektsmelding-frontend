import React from 'react';
import { rest } from 'msw';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainComponent from '../ui/MainComponent';

const Template: ComponentStory<typeof MainComponent> = (args: any) => <MainComponent data={args} />;

export const IKKE_PÅKREVD = Template.bind({});

IKKE_PÅKREVD.args = {
    arbeidsforhold: {
        896929119: {
            identifikator: '896929119',
            personIdentifikator: null,
            navn: 'SAUEFABRIKK',
            fødselsdato: null,
            arbeidsforholdreferanser: [
                {
                    internArbeidsforholdId: '99ab90b6-98fd-4ab8-8632-fc08d8cb898e',
                    eksternArbeidsforholdId: '2',
                },
            ],
        },
        972674818: {
            identifikator: '972674818',
            personIdentifikator: null,
            navn: 'PENGELØS SPAREBANK',
            fødselsdato: null,
            arbeidsforholdreferanser: [
                {
                    internArbeidsforholdId: 'b8c8b29f-42da-4aef-9714-6fbc9772079f',
                    eksternArbeidsforholdId: '1',
                },
            ],
        },
    },
    endpoints: {
        kompletthetBeregning: 'lel',
    },
    readOnly: false,
    saksbehandlere: {
        Z994142: 'F_Z994142 E_Z994142',
        Z994895: 'F_Z994895 E_Z994895',
        Z994158: 'F_Z994158 E_Z994158',
    },
    aksjonspunkter: [
        {
            aksjonspunktType: {
                kode: 'MANU',
                kodeverk: 'AKSJONSPUNKT_TYPE',
            },
            begrunnelse: null,
            besluttersBegrunnelse: 'evvv',
            definisjon: {
                skalAvbrytesVedTilbakeføring: false,
                kode: '9069',
                kodeverk: 'AKSJONSPUNKT_DEF',
            },
            erAktivt: true,
            fristTid: null,
            kanLoses: true,
            status: {
                kode: 'OPPR',
                kodeverk: 'AKSJONSPUNKT_STATUS',
            },
            toTrinnsBehandling: true,
            toTrinnsBehandlingGodkjent: false,
            vilkarType: null,
            vurderPaNyttArsaker: [
                {
                    kode: 'ANNET',
                    kodeverk: 'VURDER_AARSAK',
                },
            ],
            venteårsak: {
                kanVelgesIGui: false,
                kode: '-',
                kodeverk: 'VENT_AARSAK',
            },
            venteårsakVariant: null,
            opprettetAv: 'srvk9sak',
        },
    ],
};

export default {
    args: IKKE_PÅKREVD.args,
    title: 'Application',
    component: MainComponent,
} as ComponentMeta<typeof MainComponent>;

IKKE_PÅKREVD.parameters = {
    msw: {
        handlers: [
            rest.get('/lel', (req, res, ctx) =>
                res(
                    ctx.json({
                        tilstand: [
                            {
                                periode: '2022-08-01/2022-08-04',
                                status: [
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '896929119',
                                            arbeidsforhold: '2',
                                        },
                                        status: 'IKKE_PÅKREVD',
                                        journalpostId: null,
                                    },
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '972674818',
                                            arbeidsforhold: null,
                                        },
                                        status: 'MOTTATT',
                                        journalpostId: '573777857',
                                    },
                                ],
                                vurdering: {
                                    kode: '-',
                                    beskrivelse: 'Udefinert',
                                },
                                tilVurdering: true,
                                begrunnelse: null,
                            },
                            {
                                periode: '2022-08-15/2022-08-18',
                                status: [
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '896929119',
                                            arbeidsforhold: '2',
                                        },
                                        status: 'IKKE_PÅKREVD',
                                        journalpostId: null,
                                    },
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '972674818',
                                            arbeidsforhold: null,
                                        },
                                        status: 'MOTTATT',
                                        journalpostId: '573777857',
                                    },
                                ],
                                vurdering: {
                                    kode: '-',
                                    beskrivelse: 'Udefinert',
                                },
                                tilVurdering: true,
                                begrunnelse: null,
                            },
                            {
                                periode: '2022-08-22/2022-08-25',
                                status: [
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '896929119',
                                            arbeidsforhold: '2',
                                        },
                                        status: 'IKKE_PÅKREVD',
                                        journalpostId: null,
                                    },
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '972674818',
                                            arbeidsforhold: null,
                                        },
                                        status: 'MOTTATT',
                                        journalpostId: '573777857',
                                    },
                                ],
                                vurdering: {
                                    kode: '-',
                                    beskrivelse: 'Udefinert',
                                },
                                tilVurdering: true,
                                begrunnelse: null,
                            },
                            {
                                periode: '2022-08-08/2022-08-10',
                                status: [
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '896929119',
                                            arbeidsforhold: '2',
                                        },
                                        status: 'IKKE_PÅKREVD',
                                        journalpostId: null,
                                    },
                                    {
                                        arbeidsgiver: {
                                            arbeidsgiver: '972674818',
                                            arbeidsforhold: null,
                                        },
                                        status: 'MOTTATT',
                                        journalpostId: '573777857',
                                    },
                                ],
                                vurdering: {
                                    kode: '-',
                                    beskrivelse: 'Udefinert',
                                },
                                tilVurdering: true,
                                begrunnelse: null,
                            },
                        ],
                    })
                )
            ),
        ],
    },
};

IKKE_PÅKREVD.args = {
    arbeidsforhold: {
        896929119: {
            identifikator: '896929119',
            personIdentifikator: null,
            navn: 'SAUEFABRIKK',
            fødselsdato: null,
            arbeidsforholdreferanser: [
                {
                    internArbeidsforholdId: '99ab90b6-98fd-4ab8-8632-fc08d8cb898e',
                    eksternArbeidsforholdId: '2',
                },
            ],
        },
        972674818: {
            identifikator: '972674818',
            personIdentifikator: null,
            navn: 'PENGELØS SPAREBANK',
            fødselsdato: null,
            arbeidsforholdreferanser: [
                {
                    internArbeidsforholdId: 'b8c8b29f-42da-4aef-9714-6fbc9772079f',
                    eksternArbeidsforholdId: '1',
                },
            ],
        },
    },
    endpoints: {
        kompletthetBeregning: 'lel',
    },
    readOnly: false,
    saksbehandlere: {
        Z994142: 'F_Z994142 E_Z994142',
        Z994895: 'F_Z994895 E_Z994895',
        Z994158: 'F_Z994158 E_Z994158',
    },
    aksjonspunkter: [
        {
            aksjonspunktType: {
                kode: 'MANU',
                kodeverk: 'AKSJONSPUNKT_TYPE',
            },
            begrunnelse: null,
            besluttersBegrunnelse: 'evvv',
            definisjon: {
                skalAvbrytesVedTilbakeføring: false,
                kode: '9069',
                kodeverk: 'AKSJONSPUNKT_DEF',
            },
            erAktivt: true,
            fristTid: null,
            kanLoses: false,
            status: {
                kode: 'UTFO',
                kodeverk: 'AKSJONSPUNKT_STATUS',
            },
            toTrinnsBehandling: true,
            toTrinnsBehandlingGodkjent: false,
            vilkarType: null,
            vurderPaNyttArsaker: [
                {
                    kode: 'ANNET',
                    kodeverk: 'VURDER_AARSAK',
                },
            ],
            venteårsak: {
                kanVelgesIGui: false,
                kode: '-',
                kodeverk: 'VENT_AARSAK',
            },
            venteårsakVariant: null,
            opprettetAv: 'srvk9sak',
        },
    ],
};
