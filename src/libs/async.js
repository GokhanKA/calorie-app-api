async function asyncForEach(array, callback) {
	Promise.all(array.map((item, index) => callback(item, index, array)));
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
	asyncForEach,
	sleep,
};
