import { render, screen } from '@testing-library/react';
import App from '../App';
import { MenuContextProvider } from '../contexts';

describe('App initial state tests', () => {
  test('App renders renders properly', () => {
    const { asFragment } = render(
      <MenuContextProvider>
        <App />
      </MenuContextProvider>
    );

    const selectAllElement = screen.getByText(/Toggle select all/);

    expect(asFragment()).toMatchSnapshot();
    expect(selectAllElement).toBeInTheDocument();

  });
});
