import Aksjonspunkt from '../types/Aksjonspunkt';

// eslint-disable-next-line import/prefer-default-export
export const finnAktivtAksjonspunkt = (aksjonspunkter: Aksjonspunkt[]) =>
    aksjonspunkter.find((aksjonspunkt) => aksjonspunkt.status.kode === 'OPPR');
