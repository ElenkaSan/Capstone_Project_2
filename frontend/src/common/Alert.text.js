import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

it('renders without crashing', function () {
	render(<Alert />);
});

it('matches snapshot for error', function () {
	let messages = ['It does not work!'];
	const { asFragment } = render(<Alert messages={messages} />);
	expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot for no errors', function () {
	let messages = ['It works!'];
	const { asFragment } = render(<Alert messages={messages} />);
	expect(asFragment()).toMatchSnapshot();
});