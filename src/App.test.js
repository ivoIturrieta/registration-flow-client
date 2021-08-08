import {
  fireEvent,
 render,
} from '@testing-library/react'; // testing helpers
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event' // testing helpers for imitating user events
import App from './App'; // the app that we are going to test

const invalidEmailText = 'Please enter valid email address.';
const invalidPasswordText = 'The password should be minimum 8 characters long with at least one letter and one number'
const invalidNameText = "The full name should be at least 5 characters long."
const confirmPasswordText = "Please enter your confirm password."

describe('when user not registered/logged in', () => {
  it('users sees login form first and can switch to registration form and back to login', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    getByText("Do not have an account?");
    getByText("Register");

    //Login form
    getByPlaceholderText("Email");
    getByPlaceholderText("Password");
    expect(queryByText('Name')).toBeNull();
    expect(queryByText('Re-typed password')).toBeNull();

    userEvent.click(getByText('Register').closest('button'));

    //Registration form
    getByPlaceholderText("Email");
    getByPlaceholderText("Password");
    getByPlaceholderText("Re-typed password");
    getByPlaceholderText('Name');

    userEvent.click(getByText('Login').closest('button'));

     //Login form
     getByPlaceholderText("Email");
     getByPlaceholderText("Password");
     expect(queryByText('Name')).toBeNull();
     expect(queryByText('Re-typed password')).toBeNull();
  });

  it('User should not be able to submit a form with errors', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    userEvent.type(getByPlaceholderText('Email'), "4lcr@");
    userEvent.type(getByPlaceholderText('Password'), "4lcr@");

    expect(queryByText(invalidEmailText)).toBeNull();
    expect(queryByText(invalidPasswordText)).toBeNull();

    userEvent.click(getByText('Submit').closest('button'));
    
    queryByText(invalidEmailText);
    queryByText(invalidPasswordText);

    userEvent.click(getByText('Register').closest('button'));

    userEvent.type(getByPlaceholderText('Email'), "4lcr@");
    userEvent.type(getByPlaceholderText('Password'), "4lcr@");
    userEvent.type(getByPlaceholderText("Name"), "4lcr");
  

    userEvent.click(getByText('Submit').closest('button'));

    queryByText(invalidEmailText);
    queryByText(invalidPasswordText);
    queryByText(confirmPasswordText);
    queryByText(invalidNameText);
  });

  it('User should be able to input a correct password', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Password')
    fireEvent.change(input, {target: {value: "validPassword1"}});

    userEvent.click(getByText('Submit').closest('button'));

    queryByText(invalidEmailText);
    expect(queryByText(invalidPasswordText)).toBeNull();
  });

  it('User should be able to input a correct email', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<App />);
    const input = getByPlaceholderText('Email')
    fireEvent.change(input, {target: {value: "validemail@gmail.com"}});

    userEvent.click(getByText('Submit').closest('button'));

    expect(queryByText(invalidEmailText)).toBeNull();
    queryByText(invalidPasswordText);
  });
});

describe("When user is registered or logged in", () => {
  beforeEach(() => {
    const store = { accessToken: "accessToken", name: "Test name" };

    Object.defineProperty(window, "localStorage", {
      value: {
        name: "Test Name",
        getItem: jest.fn((key) => (store[key] || null)),
        setItem: jest.fn(() => null)
      },
      writable: true
    });
  });
  
  it("Should see logged in text and be able to log out", () => {
    const { getByText } = render(<App />);
    getByText(/Welcome/);
    getByText(/Test name/);
    getByText(/to logout click/);
    getByText(/here/);

    userEvent.click(getByText('here').closest('button'));

    getByText("Do not have an account?");
    getByText("Register");
  });
});