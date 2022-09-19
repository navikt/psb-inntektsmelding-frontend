import React from 'react';
import { rest } from 'msw';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainComponent from '../ui/MainComponent';
import { ikkePaakrevd, manglerInntektsmelding } from '../../mock/mockedKompletthetsdata';
import inntektsmeldingPropsMock from '../../mock/inntektsmeldingPropsMock';

const Template: ComponentStory<typeof MainComponent> = (args: any) => <MainComponent data={args} />;

export const IkkePaakrevd = Template.bind({});
export const Mangler = Template.bind({});

export default {
    args: inntektsmeldingPropsMock,
    argTypes: { onFinished: { action: 'clicked' } },
    title: 'Inntektsmelding',
    component: MainComponent,
} as ComponentMeta<typeof MainComponent>;

IkkePaakrevd.args = inntektsmeldingPropsMock;
IkkePaakrevd.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(ikkePaakrevd)))],
    },
};

Mangler.parameters = {
    msw: {
        handlers: [rest.get('/tilstand', (req, res, ctx) => res(ctx.json(manglerInntektsmelding)))],
    },
};
