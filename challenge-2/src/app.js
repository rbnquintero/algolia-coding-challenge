const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'latency',
  '56f24e4276091e774e8157fe4b8b11f6'
);

const search = instantsearch({
  indexName: 'movies',
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
  <h1>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "year" }{{/helpers.highlight}}</p>
  <p>{{#helpers.highlight}}{ "attribute": "actors" }{{/helpers.highlight}}</p>
  <p> Score: {{ score }}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.refinementList({
    container: '#genre-list',
    attribute: 'genre',
    searchable: true
  }),
  instantsearch.widgets.refinementList({
    container: '#actors-list',
    attribute: 'actors',
    operator: 'and',
    searchable: true
  }),
  instantsearch.widgets.menu({
    container: '#year-list',
    attribute: 'year'
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
