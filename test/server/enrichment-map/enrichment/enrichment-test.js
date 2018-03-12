const chai = require('chai');
const expect = chai.expect;
const {enrichment} = require('../../../server/enrichment-map/enrichment');

describe('test enrichment', function() {
  it('it should return an object', function() {
    return (enrichment('AFF4')).then(function(res) {
      const result = { 'GO:0006354':
      { signf: '!',
        pvalue: '8.70e-03',
        T: '124',
        'Q&T': '1',
        'Q&T/Q': '1.000',
        'Q&T/T': '0.008',
        't type': 'BP',
        't group': '6',
        't name': 'DNA-templated transcription, elongation',
        't depth': '1',
        'Q&T list': 'AFF4' },
     'GO:0006368':
      { signf: '!',
        pvalue: '8.70e-03',
        T: '100',
        'Q&T': '1',
        'Q&T/Q': '1.000',
        'Q&T/T': '0.010',
        't type': 'BP',
        't group': '6',
        't name': 'transcription elongation from RNA polymerase II promoter',
        't depth': '1',
        'Q&T list': 'AFF4' },
     'REAC:75955':
      { signf: '!',
        pvalue: '7.75e-03',
        T: '61',
        'Q&T': '1',
        'Q&T/Q': '1.000',
        'Q&T/T': '0.016',
        't type': 'rea',
        't group': '4',
        't name': 'RNA Polymerase II Transcription Elongation',
        't depth': '1',
        'Q&T list': 'AFF4' },
     'REAC:112382':
      { signf: '!',
        pvalue: '7.75e-03',
        T: '61',
        'Q&T': '1',
        'Q&T/Q': '1.000',
        'Q&T/T': '0.016',
        't type': 'rea',
        't group': '4',
        't name': 'Formation of RNA Pol II elongation complex',
        't depth': '2',
        'Q&T list': 'AFF4' },
     'REAC:674695':
      { signf: '!',
        pvalue: '7.75e-03',
        T: '83',
        'Q&T': '1',
        'Q&T/Q': '1.000',
        'Q&T/T': '0.012',
        't type': 'rea',
        't group': '5',
        't name': 'RNA Polymerase II Pre-transcription Events',
        't depth': '1',
        'Q&T list': 'AFF4' } };

      expect(res).to.deep.equal(result);
    });
  });
});