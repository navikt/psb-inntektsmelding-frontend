export interface Kompletthet {
    tilstand: Tilstand[];
}

export interface Tilstand {
    periode: string;
    status: Status[];
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
