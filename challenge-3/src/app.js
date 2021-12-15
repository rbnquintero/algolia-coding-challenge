const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'AIAUO5Z4QR',
  '4359ece339a8d0b9b301bb66e436ab66'
);

const search = instantsearch({
  indexName: 'wine',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>Quality: {{ quality }}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#year-list',
    attribute: 'year',
    searchable: true
  }),
  instantsearch.widgets.refinementList({
    container: '#domain-list',
    attribute: 'domain',
    searchable: true
  }),
  instantsearch.widgets.rangeInput({
    container: '#price-range',
    attribute: 'price'
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
