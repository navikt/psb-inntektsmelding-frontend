import React from 'react';
import { rest } from 'msw';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainComponent from '../ui/MainComponent';
import ferdigvisning, {
    ikkePaakrevd,
    ikkePaakrevdOgManglerInntektsmelding,
    manglerFlereInntektsmeldinger,
    manglerInntektsmelding,
} from '../../mock/mockedKompletthetsdata';
import inntektsmeldingPropsMock, { aksjonspunkt9071Props } from '../../mock/inntektsmeldingPropsMock';

export default {
    args: inntektsmeldingPropsMock,
    argTypes: { onFinished: { action: 'clicked' } },
    title: 'Inntektsmelding',
    component: MainComponent,
} as ComponentMeta<typeof MainComponent>;

const Template: ComponentStory<typeof MainComponent> = (args: any) => <MainComponent data={args} />;

export const IkkePaakrevd = Template.bind({});
export const Mangler9069 = Template.bind({});
export const Mangler9071 = Template.bind({});
export const ManglerFlere9071 = Template.bind({});
export const IkkePaakrevdOgMangler9071 = Template.bind({});
export const FerdigVisning9069 = Template.bind({});
export const FerdigVisning9071 = Template.bind({});

IkkePaakrevd.args = inntektsmeldingPropsMock;
IkkePaakrevd.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(ikkePaakrevd)))],
    },
};

Mangler9069.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(manglerInntektsmelding)))],
    },
};
Mangler9071.args = aksjonspunkt9071Props;
Mangler9071.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(manglerInntektsmelding)))],
    },
};

ManglerFlere9071.args = aksjonspunkt9071Props;
ManglerFlere9071.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(manglerFlereInntektsmeldinger)))],
    },
};
IkkePaakrevdOgMangler9071.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(ikkePaakrevdOgManglerInntektsmelding)))],
    },
};
FerdigVisning9069.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(ferdigvisning)))],
    },
};
FerdigVisning9071.args = aksjonspunkt9071Props;
FerdigVisning9071.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(ferdigvisning)))],
    },
};
