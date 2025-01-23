import React from 'react';
import { createRoot } from 'react-dom/client';
import { act } from 'react';
import { fireEvent, waitFor } from '@testing-library/react'
import { Login } from '../../src/components/Login';
import { User } from '../../src/model/Model';
import History from '../../src/utils/History';

const someUser: User = {
    userName: 'someUser',
    email: 'someEmail'
}

describe('Login component test suite', () => {
    let container: HTMLDivElement;
    const authServiceMock = {
        login: jest.fn()
    };
    const setUserMock = jest.fn();

    const historyMock = History;
    History.push = jest.fn();

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            const root = createRoot(container!);
            root.render(<Login authService={authServiceMock as any} setUser={setUserMock}/>);
        });
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });

    test('Renders correctly initial document', () => {
        const title = document.querySelector('h2');
        expect(title!.textContent).toBe('Please login');

        const inputs = document.querySelectorAll('input');
        expect(inputs).toHaveLength(3);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login');

        const label = document.querySelector('label');
        expect(label).not.toBeInTheDocument();
    });

    test('Passes credentials correclty', () => {
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        act(() => {
            fireEvent.change(loginInput, {target:{value: 'someUser'}});
            fireEvent.change(passwordInput, {target:{value: 'somePass'}});
            fireEvent.click(loginButton);
        });

        expect(authServiceMock.login).toBeCalledWith(
            'someUser',
            'somePass'
        );
    });

    test('Correclty handles login success', async ()=> {
        authServiceMock.login.mockImplementation(() => {return someUser});   
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        act(() => {
            fireEvent.change(loginInput, {target:{value: 'someUser'}});
            fireEvent.change(passwordInput, {target:{value: 'someEmail'}});
            loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));   
        });
        
        const statusLabel = await waitFor(()=> container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        //expect(statusLabel).toHaveTextContent('Login succeded');
        expect(setUserMock).toBeCalledWith(someUser);
        expect(historyMock.push).toBeCalledWith('/profile');
    });

    test('Correclty handles login fail', async ()=>{
        authServiceMock.login.mockImplementation(() => {return undefined});
        const inputs = document.querySelectorAll('input');
        const loginInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];

        act(() => {
            fireEvent.change(loginInput, {target:{value: 'someUser'}});
            fireEvent.change(passwordInput, {target:{value: 'someEmail'}});
            loginButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));   
        });

        const statusLabel = await waitFor(()=> container.querySelector('label'));
        expect(statusLabel).toBeInTheDocument();
        expect(statusLabel).toHaveTextContent('Login failed');
    });
});