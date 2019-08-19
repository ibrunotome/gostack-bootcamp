import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechList from '~/components/TechList';

describe('TechList component', () => {
  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });

  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.click(getByTestId('tech-form'));

    cleanup();

    ({ getByTestId, getByLabelText, getByText } = render(<TechList />));
    expect(window.localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']));
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});
