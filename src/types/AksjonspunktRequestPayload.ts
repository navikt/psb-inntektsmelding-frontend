interface Perioder {
    periode: string;
    fortsett: boolean;
    begrunnelse: string;
}

interface AksjonspunktRequestPayload {
    begrunnelse: string;
    perioder: Perioder[];
}

export default AksjonspunktRequestPayload;
