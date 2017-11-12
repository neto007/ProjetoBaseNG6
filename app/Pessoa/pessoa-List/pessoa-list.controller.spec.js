import { expect } from 'chai';
import Controller from './pessoa-list.controller';

describe('pessoa-list Controller', () => {
  it('Should be constructed', () => {
    // Arrange
    const controller = new Controller();

    // Act

    // Assert
    expect(controller).not.to.be.undefined;
  });
});
