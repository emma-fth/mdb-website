import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Contact from '../page'

// Mock the useAnimationLoad hook
jest.mock('../../hooks/useAnimationLoad', () => ({
  useAnimationLoad: () => ({ isLoaded: true })
}))

describe('Contact Page', () => {
  it('renders without crashing', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { name: 'Contact Us' })).toBeInTheDocument()
  })

  it('links to Instagram in a new tab', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /@mdbdev/i })
    expect(link).toHaveAttribute('href', 'https://instagram.com/mdbdev')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('links to the contact email', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /contact@mdb\.dev/i })
    expect(link).toHaveAttribute('href', 'mailto:contact@mdb.dev')
    expect(link).not.toHaveAttribute('target')
  })

  it('links to LinkedIn in a new tab', () => {
    render(<Contact />)
    const link = screen.getByRole('link', { name: /MDB on LinkedIn/i })
    expect(link).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/mobile-developers-of-berkeley/'
    )
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('does not render a contact form', () => {
    render(<Contact />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
  })
})
