const React = require('react');
const h = require('react-hyperscript');
const _ = require('lodash');

const PathwayCommonsService = require('../../../../../services/').PathwayCommonsService;

const datasourceLinks = [
  ['BioGrid', 'http://identifiers.org/biogrid/', ''],
  ['DrugBank', 'https://www.drugbank.ca/', ''],
  ['mirtarBase', 'http://identifiers.org/mirtarbase/', ''],
  ['NetPath', 'http://www.netpath.org/', 'molecule?molecule_id='],
  ['PANTHER', 'http://pantherdb.org/', 'genes/geneList.do?searchType=basic&fieldName=all&organism=all&listType=1&fieldValue='],
  ['PID', null],
  ['PhosphoSitePlus', null],
  ['Reactome', 'http://identifiers.org/reactome/', ''],
  ['SMPD', null],
  ['Wikipathways', 'http://identifiers.org/wikipathways/' , ''],
  ['UniProt', '	http://identifiers.org/uniprot/', ''],
  ['HGNC Symbol', 'http://identifiers.org/hgnc.symbol/', ''],
  ['HGNC', 'http://identifiers.org/hgnc/', ''],
  ['ChEBI', 'http://identifiers.org/chebi/', ''],
  ['KEGG', 'http://identifiers.org/kegg/', ''],
  ['PubMed', 'http://identifiers.org/pubmed/', ''],
  ['Ensembl', 'http://identifiers.org/ensembl/', ''],
  ['Enzyme Nomenclature', 'http://identifiers.org/ec-code/', ''],
  ['PubChem-Substance', 'http://identifiers.org/pubchem.substance/', ''],
  ['3DMET', 'http://identifiers.org/3dmet/', ''],
  ['Chemical Component Dictionary', 'http://identifiers.org/pdb-ccd/', ''],
  ['CAS', 'http://identifiers.org/cas/', '']
];

class GraphInfoMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentWillMount() {
    PathwayCommonsService.query(this.props.uri, 'json', 'Entity/comment')
      .then(responses => {
        this.setState({
          comments: responses ? responses.traverseEntry[0].value : []
        });
      });
  }

  getDatasourceLink(datasource) {
    const link = datasourceLinks.filter(ds => ds[0].toUpperCase() === datasource.toUpperCase());

    return _.get(link, '0.1', '');
  }

  render() {
    const datasourceLink = this.getDatasourceLink(this.props.datasource);

    const noInfoMessage = h('span', [
      'No additional information was found for this network!',
      h('br'),
      h('br'),
      'Additional information about the network is normally found here, but we couldn\'t find any for this one.'
    ]);

    return (
      h('div', [
        h('h1', this.props.name),
        h('h4', [
          'Sourced from ',
          h('a', { href: datasourceLink, target: '_blank'}, this.props.datasource)
        ]),
        ...(this.state.comments.length ?
          [h('h2', 'Additional Information')].concat(
            this.state.comments.map((comment, index) => {
              return (
                h('div', {
                  'key': index
                }, [
                    comment.replace(/<p>/g, ' '),
                    h('br'),
                    h('br')
                  ])
              );
            })
          ) : [noInfoMessage]
        )
      ])
    );
  }
}

module.exports = GraphInfoMenu;