import { expect } from 'chai';
import Controller from './usuario-adm-create.controller';

describe('usuario-adm-create Controller', () => {
  it('Should be constructed', () => {
    // Arrange
    const controller = new Controller();

    // Act

    // Assert
    expect(controller).not.to.be.undefined;
  });
});
