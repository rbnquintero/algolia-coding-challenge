const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'latency',
  '059c79ddd276568e990286944276464a'
);

const search = instantsearch({
  indexName: 'concert_events_instantsearchjs',
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
  <p>{{#helpers.highlight}}{ "attribute": "location" }{{/helpers.highlight}}</p>
  <p>{{ date }}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.rangeInput({
    container: '#date-list',
    attribute: 'date'
  }),
  instantsearch.widgets.refinementList({
    container: '#location-list',
    attribute: 'location',
    searchable: true
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
