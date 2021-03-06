import { render, screen } from '@testing-library/react';
import App from '../App';
import { TreeContextProvider } from '../contexts';

describe('App initial state tests', () => {
  test('App renders renders properly', () => {
    const { asFragment } = render(
      <TreeContextProvider>
        <App />
      </TreeContextProvider>
    );

    const selectAllElement = screen.getByText(/Toggle select all/);

    expect(asFragment()).toMatchSnapshot();
    expect(selectAllElement).toBeInTheDocument();

  });
});
