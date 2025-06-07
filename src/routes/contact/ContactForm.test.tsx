import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm validation', () => {
  it('shows errors when fields are empty on submit', async () => {
    render(<ContactForm />);
    await userEvent.click(screen.getByRole('button', { name: /send/i }));

    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
    expect(screen.getByText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText("Message field can't be empty")).toBeInTheDocument();
  });
});
