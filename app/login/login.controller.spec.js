import { expect } from 'chai';
import Controller from './login.controller';

describe('login Controller', () => {
  it('Should be constructed', () => {
    // Arrange
    const controller = new Controller();

    // Act

    // Assert
    expect(controller).not.to.be.undefined;
  });
});
