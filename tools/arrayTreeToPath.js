module.exports = (array, seperator) => {
	if (seperator == undefined) seperator = '/';
	let final = [];
	function recurse(obj, basename, isbase) {
		let current_basename = basename;

		if (typeof obj == 'object') {
			for (let i = 0; i < obj.length; i++) {
				let key = obj[i][0];
				let value = obj[i][1];
				if (typeof obj[i] =='object') {
					current_basename.push(key);

					if (typeof value == 'object') {
						recurse(value, current_basename, false);
					}
				} else {
					current_basename.push(obj[i]);
				}
				if (isbase) {
					final.push(current_basename);
					current_basename = [];
				}
			}
		} else {
			current_basename.push(obj);
		}
	}

	recurse(array, [], true);

	return final.map(v => v.join(seperator));
}
