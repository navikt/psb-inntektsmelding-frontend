interface AksjonspunktRequestPayload {
    begrunnelse: string;
    perioder: {
        [periodeString: string]: {
            fortsettUtenInntektsmelding: true;
        };
    };
}

export default AksjonspunktRequestPayload;
