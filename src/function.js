import _ from 'lodash'

export const deepdifference = (object, base) => {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}

export const difference = (object, base) => {
  let temp = {}
  for (const key in base) {
    if (!_.isEqual(object[key], base[key])){
      temp[key] = object[key]
    }
  }
  return temp
}