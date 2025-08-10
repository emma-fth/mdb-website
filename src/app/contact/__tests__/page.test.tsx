import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Contact from '../page'

// Mock the submitContactForm function
jest.mock('../../../utils/supabase', () => ({
  submitContactForm: jest.fn()
}))

// Mock the useAnimationLoad hook
jest.mock('../../hooks/useAnimationLoad', () => ({
  useAnimationLoad: () => ({ isLoaded: true })
}))

describe('Contact Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Contact />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('displays all form fields', () => {
    render(<Contact />)
    
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('has a submit button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('updates form data on input change', () => {
    render(<Contact />)
    
    const nameInput = screen.getByLabelText('Name')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    
    expect(nameInput).toHaveValue('John Doe')
  })

  it('shows loading state during submission', async () => {
    const { submitContactForm } = require('../../../utils/supabase')
    submitContactForm.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<Contact />)
    
    // Fill out the form first
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Test Subject' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } })
    
    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  it('shows success message after successful submission', async () => {
    const { submitContactForm } = require('../../../utils/supabase')
    submitContactForm.mockResolvedValue({ success: true })
    
    render(<Contact />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Test Subject' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Thank you! Your message has been sent successfully.')).toBeInTheDocument()
    })
  })

  it('shows error message after failed submission', async () => {
    const { submitContactForm } = require('../../../utils/supabase')
    submitContactForm.mockRejectedValue(new Error('Network error'))
    
    render(<Contact />)
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Test Subject' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Test message' } })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })

  it('clears form after successful submission', async () => {
    const { submitContactForm } = require('../../../utils/supabase')
    submitContactForm.mockResolvedValue({ success: true })
    
    render(<Contact />)
    
    // Fill out the form
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email Address')
    const subjectInput = screen.getByLabelText('Subject')
    const messageInput = screen.getByLabelText('Message')
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(subjectInput).toHaveValue('')
      expect(messageInput).toHaveValue('')
    })
  })
})
