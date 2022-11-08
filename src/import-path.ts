import {AtRule} from 'postcss';

export function extractImportPath(atRule: AtRule): string {
    // CSS doesn't support multiple parameters AFAIK
    // however, LESS does support (reference) and it shows up as part of params
    const splitParams: string[] = atRule.params.split(' ');
    const quoteParams: string[] = splitParams
        .map((param) => {
            // account for imports that use the @import url("some-url"); format
            if (param.startsWith('url(')) {
                return param.replace(/^url\(/, '').replace(/\)$/, '');
            } else {
                return param;
            }
        })
        .filter((param) => param.match(/^['"]/) && param.match(/['"]$/));

    const importPath =
        quoteParams[
            // assume that the string we actually want is the last one
            quoteParams.length - 1
        ];

    if (!importPath) {
        throw new Error(`Couldn't find import path from atRule`);
    }

    return (
        importPath
            // remove quotes at the beginning of the path
            .replace(/^['"]/, '')
            // remove quotes at the end of the path
            .replace(/['"]$/, '')
    );
}
