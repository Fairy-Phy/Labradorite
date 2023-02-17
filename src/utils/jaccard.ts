const duplicateStringLength = (s: string): number => {
	const l: string[] = [];
	for (let c of s) {
		if (!l.includes(c)) {
			l.push(c);
		}
	}

	return l.length;
};

export default function calc_jaccard(x: string, y: string): number {
	const nl: string[] = [];
	for (let c of x) {
		if (y.includes(c) && !nl.includes(c)) {
			nl.push(c);
		}
	}
	const n = nl.length;

	const xl = duplicateStringLength(x);
	const yl = duplicateStringLength(y);

	return n / (xl + yl - n);
}
