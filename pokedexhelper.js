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
            const enDescriptions = speciesResult.flavor_text_entries.filter(flavor => flavor.language.name === 'en')
            const description = enDescriptions[0].flavor_text;
            return {
                ...nameResult,
                description
            }
        });
	}
}
