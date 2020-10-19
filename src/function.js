import _ from 'lodash'
import { store as notifStore } from "react-notifications-component";

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

export const onGqlError = (error) => {
	notifStore.addNotification({
		message: error.message || "伺服器錯誤",
		type: "danger",
		insert: "top",
		container: "top-center",
		animationIn: ["animated", "fadeIn"],
		animationOut: ["animated", "fadeOut"],
		dismiss: {
			duration: 5000,
		},
	});
};