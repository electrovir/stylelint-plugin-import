import {basename} from 'path';
import {prefix} from '../../plugin-util';
import {
    createDefaultRule,
    DefaultRuleOptions,
    DefaultOptionMode,
    doesMatchLineExceptions,
} from 'stylelint-rule-creator';
import {extractImportPath} from '../../import-path';

const messages = {
    shouldStartWith(importFileName: string, start: string) {
        return `"${importFileName}" import should start with "${start}"`;
    },
    shouldNotStartWith(importFileName: string, start: string) {
        return `"${importFileName}" import should not start with "${start}"`;
    },
};

export type FileNameStartsWithRuleOptions = DefaultRuleOptions & {
    startWith: string;
};

const defaultOptions: FileNameStartsWithRuleOptions = {
    mode: DefaultOptionMode.REQUIRE,
    startWith: '_',
};

export const fileNameStartsWithRule = createDefaultRule<
    typeof messages,
    FileNameStartsWithRuleOptions
>({
    ruleName: `${prefix}/file-name-starts-with`,
    messages,
    defaultOptions,
    ruleCallback: (report, messages, {ruleOptions, root, exceptionRegExps}) => {
        root.walkAtRules('import', atRule => {
            if (doesMatchLineExceptions(atRule, exceptionRegExps)) {
                return;
            }

            const startWith = ruleOptions.startWith || defaultOptions.startWith;

            const fileName = basename(extractImportPath(atRule));

            if (ruleOptions.mode === DefaultOptionMode.REQUIRE && !fileName.startsWith(startWith)) {
                report({
                    message: messages.shouldStartWith(fileName, startWith),
                    node: atRule,
                    word: atRule.toString(),
                });
            } else if (
                ruleOptions.mode === DefaultOptionMode.BLOCK &&
                fileName.startsWith(startWith)
            ) {
                report({
                    message: messages.shouldNotStartWith(fileName, startWith),
                    node: atRule,
                    word: atRule.toString(),
                });
            }
        });
    },
});
