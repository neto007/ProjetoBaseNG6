import { expect } from 'chai';
import Controller from './usuario-create.controller';

describe('usuario-create Controller', () => {
  it('Should be constructed', () => {
    // Arrange
    const controller = new Controller();

    // Act

    // Assert
    expect(controller).not.to.be.undefined;
  });
});
