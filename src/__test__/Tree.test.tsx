import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';

import App from '../App';
import { MenuContextProvider } from '../contexts';

describe('<Tree />', () => {
  beforeAll(() => {
    render(
      <MenuContextProvider>
        <App />
      </MenuContextProvider>
    );
  });

  afterAll(() => {
    cleanup();
  })

  
  test('if select all toggle is working', () => {
    // Arrange
    const selectAllCheckbox = screen.getByTestId('selectAll').querySelector('input[type="checkbox"]') as HTMLInputElement;

    // Act
    fireEvent.click(selectAllCheckbox);

    // Assert
    expect(selectAllCheckbox).toBeChecked();

  });

  /*
   * Todo: 
   * Commenting as I am unable to wrap my head around as to how to
   * access access the elements as everything I tried seem to throw
   * errors.
   */

  // test('if all menu items are selected', async () => {
  //   const treeMenu = await screen.findByTestId('treeMenu');
  //   screen.debug(treeMenu);

  //   expect(true).toBeTruthy();
  // });

});
