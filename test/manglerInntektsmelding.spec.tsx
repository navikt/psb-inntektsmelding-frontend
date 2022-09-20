import React from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { Story } from '@storybook/react';
import { composeStories } from '@storybook/testing-react';

import { render, screen, waitFor } from '@testing-library/react';
import * as stories from '../src/stories/MainComponent.stories';
import MainComponent from '../src/ui/MainComponent';
import { manglerInntektsmelding } from '../mock/mockedKompletthetsdata';
import inntektsmeldingPropsMock from '../mock/inntektsmeldingPropsMock';

const server = setupServer(rest.get('/tilstand', (req, res, ctx) => res(ctx.json(manglerInntektsmelding))));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const { Mangler } = composeStories(stories) as {
    [key: string]: Story<Partial<typeof MainComponent>>;
};

describe('Mangler inntektsmelding', () => {
    test('Viser ikke knapp for å sende inn når beslutning ikke er valgt', async () => {
        render(<MainComponent data={{ ...inntektsmeldingPropsMock, onFinished: () => ({}) }} />);
        await waitFor(() => screen.getByText(/Kan du gå videre uten inntektsmelding?/i));
        expect(screen.getByText(/Kan du gå videre uten inntektsmelding?/i)).toBeDefined();
    });
});
