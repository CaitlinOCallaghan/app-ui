const React = require('react');
const h = require('react-hyperscript');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');

class EnrichmentMenu extends React.Component {

  render(){
    return h(Tabs, [
      h('div.enrichment-drawer-header', [
        h('h2', 'Enrichment App'), //******************* CHANGE TO NEW NAME ONCE CHOSEN
        h(TabList, [
          h(Tab, {
            className: 'enrichment-drawer-tab',
            selectedClassName: 'enrichment-drawer-tab-selected'
            }, 'Legend'),
            h(Tab, {
              className: 'enrichment-drawer-tab',
              selectedClassName: 'enrichment-drawer-tab-selected'
              }, 'FAQ')
        ])

      ]),
      h(TabPanel, [
        h('h4', 'Significance'),
        h('div.enrichment-legend-container', [
          h('div.enrichment-legend-stat-significant', [
            h('p', `high 0`),
            h('p', '.025'),
            h('p', `low .05`)
          ]),
          h('div.enrichment-legend-not-significant', [
            h('p', ` none >.05`)
          ])
        ])
      ]),
      h(TabPanel, [
        h('h4', `What does it do?`),
        h('p', `This app identifies biological pathways that contain your genes of interest and displays them as an interactive network,
          allowing you to explore individual pathways.
          Pathways are drawn from Reactome (v56) and Gene Ontology, Biological Process (Ensembl v90 / Ensembl Genomes v37).`),

        h('h4', `What kinds of inputs are accepted?`),
        h('p', `This app will recognize:`),
        h('p', [
          h('li', `HUGO Gene Nomenclature (HGNC) symbols (e.g. 'TP53') and IDs (e.g. 'HGNC:11998')  `),
          h('li', `UniProt protein accessions (e.g. 'P04637')  `),
          h('li', `NCBI Gene gene IDs (e.g. '7157') `),
        ]),

        h('h4', `What do the elements of the network represent?`),
        h('p', `Each pathway is represented by a node (circle) whose size corresponds to the number of genes in that pathway.
          Pathways that share genes are connected by edges (lines) whose width corresponds to the number of shared genes.
          Click on a node to see more information about the pathway.`),

        h('h4', `How does the app identify pathways?`),
        h('p',[
          h('span',`The input gene list is compared to genes in each candidate pathway and a statistical score is calculated (adjusted p-value).
            Pathways with an adjusted p-value less than a threshold (0.05) are deemed 'enriched' for genes in the input list and are displayed in the network.
            This analysis is performed by gProfiler's g:GOst service (rev 1741 2017-10-19). Please refer to their `),
          h('a', {href: 'http://whatever.com'}, 'documentation'),
          h('span', ` for further details.`)
        ])
      ])
    ]);
  }
}

module.exports = EnrichmentMenu;