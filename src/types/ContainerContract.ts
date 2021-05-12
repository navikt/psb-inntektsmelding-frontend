import { HttpErrorHandler } from './HttpErrorHandler';

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
}

export default ContainerContract;
