import angular from 'angular';
import angularMock from 'angular-mocks';
import { expect } from 'chai';

describe('Settings Service', () => {
  
  let settingsService;

  beforeEach(angular.mock.module('front.services'));

  beforeEach(inject(($injector) => {
    settingsService = $injector.get('SettingsService');
  }));

  it('Obter URL da API', () => {

    let apiUrl = settingsService.getApiUrl();
    
    expect(apiUrl).to.be.a('string');
    
  });

  it('Testar URL com endpoint', () => {

  });
});
