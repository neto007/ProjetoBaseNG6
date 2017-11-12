import angular from 'angular';
import angularMock from 'angular-mocks';
import { expect } from 'chai';
import Service from './usuario.service';

describe('usuario Service', () => {

  let usuarioService;
  beforeEach(angular.mock.module('front.services'));

  beforeEach(inject(($injector) => {
    usuarioService = $injector.get('UsuarioService');
  }));

  it('Should be constructed usuario', () => {

    // Arrange

    // Act

    // Assert
    expect(usuarioService).not.to.be.undefined;
  });
});