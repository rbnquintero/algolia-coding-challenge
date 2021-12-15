const { algoliasearch, instantsearch } = window;

const searchClient = algoliasearch(
  'AIAUO5Z4QR',
  '4359ece339a8d0b9b301bb66e436ab66'
);

const search = instantsearch({
  indexName: 'talks',
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
  <img style="width: 150px;" src="{{ image_url }}" />
  <h1>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</h1>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
  <p>{{speakers}}</p>
  <p>{{viewed_count}} views</p>
</article>
`,
    },
  }),
  instantsearch.widgets.configure({
    facets: ['*'],
    maxValuesPerFacet: 20,
  }),
  instantsearch.widgets.refinementList({
    container: '#tags',
    attribute: 'tags',
    operator: 'and',
    searchable: true
  }),
  instantsearch.widgets.rangeInput({
    attribute: "inspiring_rating",
    container: "#inspiringRating"
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
