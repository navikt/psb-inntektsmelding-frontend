import { Period } from '@navikt/k9-period-utils';

export interface Kompletthet {
    tilstand: Tilstand[];
}

export interface Tilstand {
    periode: Period;
    status: Status[];
    begrunnelse: string;
    tilVurdering: boolean;
}

type StatusType = 'MOTTATT' | 'MANGLER';

export interface Status {
    arbeidsgiver: Arbeidsgiver;
    status: StatusType;
    journalpostId: string;
}

export interface Arbeidsgiver {
    arbeidsgiver: string;
    arbeidsforhold: null;
}
