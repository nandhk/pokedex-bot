```js
const Pokedex = require('pokedex-promise-v2'); 
const api = new Pokedex(); 
module.exports = {
	search: target => {
		return Promise.all([
			api.getPokemonByName(target),
			api.getPokemonSpeciesByName(target)
		])
        .then(results => {
            const nameResult = results[0]
            const speciesResult = results[1];

			// Filter for english descriptions
            const enDescriptions = speciesResult.flavor_text_entries.filter(flavor => flavor.language.name === 'en')
            // Use the first entry
            const description = enDescriptions[0].flavor_text;

            // Destructure the first set of results
            // and add a new description field from the
            // flavor text entries.
            return {
                ...nameResult,
                description
            }
        });
	}
}```
