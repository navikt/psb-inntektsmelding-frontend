import { HttpErrorHandler } from './HttpErrorHandler';
import AksjonspunktRequestPayload from './AksjonspunktRequestPayload';

export type ArbeidsgiverOpplysninger = Readonly<{
    navn: string;
    fødselsdato?: string;
}>;

interface ContainerContract {
    readOnly: boolean;
    arbeidsforhold: Record<string, ArbeidsgiverOpplysninger>;
    httpErrorHandler: HttpErrorHandler;
    endpoints: {
        kompletthetBeregning: string;
    };
    onFinished: (data: AksjonspunktRequestPayload) => void;
}

export default ContainerContract;
