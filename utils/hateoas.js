const prepareHATEOAS = async (joyas) => {
	const results = []
	joyas.forEach(joya => {
		results.push({
			name: joya.nombre,
			href: `/joyas/joya/${joya.id}`,
		})
	})
	const total = results.length
	const stock = joyas.reduce((total, joya) => total + joya.stock, 0)
	const HATEOAS = {
		"totalJoyas": total,
		"stockTotal": stock,
		results
	}
	return HATEOAS
}

module.exports = {
	prepareHATEOAS
}
