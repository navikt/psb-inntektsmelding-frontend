interface Perioder {
    periode: string;
    fortsett: boolean;
}

interface AksjonspunktRequestPayload {
    begrunnelse: string;
    perioder: Perioder[];
}

export default AksjonspunktRequestPayload;
