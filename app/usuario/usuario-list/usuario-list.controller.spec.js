import { expect } from 'chai';
import Controller from './usuario-list.controller';

describe('usuario-list Controller', () => {
  it('Should be constructed', () => {
    // Arrange
    const controller = new Controller();

    // Act

    // Assert
    expect(controller).not.to.be.undefined;
  });
});
