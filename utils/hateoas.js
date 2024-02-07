const prepareHATEOAS = async(joyas) => {
	const results = []
	joyas.forEach(joya => {
		results.push({
			name: joya.nombre,
			href: `/joyas/joya/${joya.id}`,
		})
  })
	const total = results.length
	const HATEOAS = {
		total,
		results
  }
	return HATEOAS
}

module.exports = {
	prepareHATEOAS
}
