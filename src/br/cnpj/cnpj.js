'use strict';

var StringMask = require('string-mask');
var BrV = require('br-validations');
var maskFactory = require('mask-factory');
var conv = require('converters');

var cnpjPattern = new StringMask('00.000.000\/0000-00');

module.exports = maskFactory({
	clearValue: function(rawValue) {
		return conv.convertNumberToCpfCnpj(rawValue).replace(/[^\d]/g, '').slice(0, 14);
	},
	format: function(cleanValue) {
		return (cnpjPattern.apply(cleanValue) || '').trim().replace(/[^0-9]$/, '');
	},
	validations: {
		cnpj: function(value) {
			return value === 0 || BrV.cnpj.validate(conv.convertNumberToCpfCnpj(value));
		}
	}
});
