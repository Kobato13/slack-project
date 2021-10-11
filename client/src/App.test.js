import { render, screen } from '@testing-library/react'
import App from './App'
import { Link } from "react-router-dom";
import Login from './components/Login'
import { 
  LoginContainer,
  LoginInnerContainer,
  Form
} from "./components/styles/Login.style"

// test('renders login', () => {
//   render(<Login/>)
//     expect(screen.getByRole('textbox', {name: /email/i})).toBeInTheDocument()
// })
