'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('mask-factory');

var cnpjPattern = new StringMask('00.000.000\/0000-00');
var cpfPattern = new StringMask('000.000.000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
    if( !rawValue.replace ){
      if( rawValue === 0 ){
        rawValue = '';
      }
      else{
        rawValue = rawValue.toString();
        while( rawValue.length < 11 || rawValue.length > 11 && rawValue.length < 14 ){
          rawValue = '0' + rawValue;
        }
      }
    }
		return rawValue.replace(/[^\d]/g, '').slice(0, 14);
	},
	format: function(cleanValue) {
		var formatedValue;

		if (cleanValue.length > 11) {
			formatedValue = cnpjPattern.apply(cleanValue);
		} else {
			formatedValue = cpfPattern.apply(cleanValue) || '';
		}

		return formatedValue.trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cpf: function(value) {
			return value.toString().length > 11 || BrV.cpf.validate(value.toString());
		},
		cnpj: function(value) {
			return value.toString().length <= 11 || BrV.cnpj.validate(value.toString());
		}
	}
});
