import Aksjonspunkt from '../types/Aksjonspunkt';
import { Kode, TilstandBeriket } from '../types/KompletthetData';
import Status from '../types/TilstandStatus';

// eslint-disable-next-line import/prefer-default-export
export const finnAktivtAksjonspunkt = (aksjonspunkter: Aksjonspunkt[]): Aksjonspunkt =>
    aksjonspunkter.find((aksjonspunkt) => aksjonspunkt.status.kode === 'OPPR');

export const finnTilstanderSomVurderes = (tilstander: TilstandBeriket[]): TilstandBeriket[] =>
    tilstander.filter(
        (tilstand) =>
            tilstand?.status.some((status) => status?.status === Status.MANGLER) &&
            tilstand?.vurdering?.kode === Kode.TOM
    );

export const finnTilstanderSomRedigeres = (tilstander: TilstandBeriket[]): TilstandBeriket[] =>
    tilstander.filter((tilstand) => tilstand.redigeringsmodus);
