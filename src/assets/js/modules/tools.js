const lz = (n) => {
	return Number(n) < 10 ? `0${n}` : `${n}`;
};

const getURLParameters = () => {
	const parameters = new URLSearchParams(document.location.search);
	return parameters;
};

const niceList = (array) => {
	if (!array || array.length === 0) {
		return "";
	}
	var clone = array.slice(0);

	return (function build() {
		if (clone.length === 1) {
			return clone[0];
		}
		if (clone.length === 2) {
			return clone[0] + " and " + clone[1];
		}
		return clone.shift() + ", " + build();
	})();
};

export { lz, getURLParameters as getURLParams, niceList };
