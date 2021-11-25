import { Period } from '@navikt/k9-period-utils';

export interface Kompletthet {
    tilstand: Tilstand[];
}

export interface Tilstand {
    periode: Period;
    status: Status[];
    begrunnelse: string;
    tilVurdering: boolean;
    vurdering: Vurdering;
}

export type StatusType = 'MOTTATT' | 'MANGLER';

export interface Status {
    arbeidsgiver: Arbeidsgiver;
    status: StatusType;
    journalpostId: string;
}

export interface Arbeidsgiver {
    arbeidsgiver: string;
    arbeidsforhold: null;
}
export interface Vurdering {
    beskrivelse: string;
    kode: Kode;
}

export enum Kode {
    FORTSETT = 'FORTSETT',
    MANGLENDE_GRUNNLAG = 'MANGLENDE_GRUNNLAG',
}
