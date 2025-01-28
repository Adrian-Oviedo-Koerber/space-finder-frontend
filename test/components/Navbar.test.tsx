import { Navbar } from '../../src/components/Navbar';
import { User } from '../../src/model/Model';
import { StaticRouter } from 'react-router';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { getByTestId } from '@testing-library/react'

describe('Navbar test suite', () => {
    let container: HTMLDivElement
    const someUser: User = {
        email: 'someEmail',
        userName: 'someUserName'
    }
    const baseLink = 'http://localhost';

    afterEach(()=>{
        document.body.removeChild(container);
        container.remove()
    });

    test('renders correctly with user', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        React.act(() => {
            const root = createRoot(container!);
            root.render(
            <StaticRouter>
                <Navbar user={someUser} />
            </StaticRouter>);
        });

        const links = container.querySelectorAll('a');
        expect(links[0].href).toBe(baseLink + '/');
        expect(links[1].href).toBe(baseLink + '/profile');
        expect(links[2].href).toBe(baseLink + '/spaces');
        expect(links[3].href).toBe(baseLink + '/logout');
    });

    test('renders correctly with user using data test', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        React.act(() => {
            const root = createRoot(container!);
            root.render(
            <StaticRouter>
                <Navbar user={someUser} />
            </StaticRouter>);
        });

        const homeLink = getByTestId(container, 'home-link') as HTMLAnchorElement;
        expect(homeLink.href).toBe(baseLink + '/');

        const profileLink = getByTestId(container, 'profile-link') as HTMLAnchorElement;
        expect(profileLink.href).toBe(baseLink + '/profile');

        const spacesLink = getByTestId(container, 'spaces-link') as HTMLAnchorElement;
        expect(spacesLink.href).toBe(baseLink + '/spaces');
    });

    test('renders correctly without user using data test', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        React.act(() => {
            const root = createRoot(container!);
            root.render(
            <StaticRouter>
                <Navbar user={undefined} />
            </StaticRouter>);
        });

        const loginLink = getByTestId(container, 'login-link') as HTMLAnchorElement;
        expect(loginLink.href).toBe(baseLink + '/login');
    });
});