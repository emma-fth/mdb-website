import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

// Mock the useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null
  })
}))

describe('Footer Component', () => {
  it('renders without crashing', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('displays organization name', () => {
    render(<Footer />)
    expect(screen.getByText('MDB @ Berkeley')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    
    // Check for footer links
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('displays copyright information', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 MDB @ Berkeley/i)).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('does not render the email or admin links', () => {
    render(<Footer />)

    expect(screen.queryByText('Email')).not.toBeInTheDocument()
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('Log in')).not.toBeInTheDocument()
  })

  it('displays all page links', () => {
    render(<Footer />)
    
    const expectedPages = ['Home', 'About', 'Projects', 'Training Program', 'Apply']
    expectedPages.forEach(page => {
      expect(screen.getByText(page)).toBeInTheDocument()
    })
  })

  it('has contact us link', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })
}) 