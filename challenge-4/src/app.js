const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'AIAUO5Z4QR',
  '4359ece339a8d0b9b301bb66e436ab66'
);

const search = instantsearch({
  indexName: 'airports',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox'
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>Airport code: {{ iata_code }}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#city-list',
    searchable: true,
    attribute: 'city',
  }),
  instantsearch.widgets.refinementList({
    container: '#codes-list',
    attribute: 'iata_code',
  }),
  instantsearch.widgets.refinementList({
    container: '#country-list',
    searchable: true,
    attribute: 'country',
  }),
  instantsearch.widgets.geoSearch({
    container: '#map',
    googleReference: window.google,
    enableRefine: true,
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
