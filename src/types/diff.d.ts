declare module "diff" {
	export type DiffObject = {
		count: number,
		added: boolean | undefined,
		removed: boolean | undefined,
		value: string
	};
    export function diffChars(
        oldStr: string,
        newStr: string,
        options?: { ignoreCase: boolean }
    ): DiffObject[];
}
