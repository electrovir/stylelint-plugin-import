import {extname} from 'path';
import {
    createDefaultRule,
    DefaultOptionMode,
    DefaultRuleOptions,
    doesMatchLineExceptions,
} from 'stylelint-rule-creator';
import {extractImportPath} from '../../import-path';
import {prefix} from '../../plugin-util';

const messages = {
    extensionRequired(line: string, extension: string) {
        return `Missing file extension "${extension}" in ${line}`;
    },
    extensionBlocked(line: string) {
        return `File extensions are not allowed: ${line}`;
    },
};

export type FileExtensionRuleOptions = DefaultRuleOptions & {
    /**
     * This is only use if the rule is required and an import is missing the extension. If "block"
     * mode is used, then all extensions are removed, not just the one provided here.
     */
    extension: string;
};

const defaultOptions: FileExtensionRuleOptions = {
    mode: DefaultOptionMode.REQUIRE,
    extension: '.css',
};

export const fileExtensionRule = createDefaultRule<typeof messages, FileExtensionRuleOptions>({
    ruleName: `${prefix}/file-extension`,
    messages,
    defaultOptions,
    ruleCallback: (report, messages, {ruleOptions, root, context, exceptionRegExps}) => {
        root.walkAtRules('import', (atRule) => {
            if (doesMatchLineExceptions(atRule, exceptionRegExps)) {
                return;
            }

            const optionsExtension: string = ruleOptions.extension || defaultOptions.extension;
            const currentExtension = extname(extractImportPath(atRule));

            if (ruleOptions.mode === DefaultOptionMode.REQUIRE && !currentExtension) {
                if (context.fix) {
                    const newNode = atRule.clone();
                    newNode.params = newNode.params.replace(/(['"]\)?)$/, optionsExtension + '$1');
                    atRule.replaceWith(newNode);
                } else {
                    report({
                        message: messages.extensionRequired(atRule.toString(), optionsExtension),
                        node: atRule,
                        word: atRule.toString(),
                    });
                }
            } else if (ruleOptions.mode === DefaultOptionMode.BLOCK && currentExtension) {
                if (context.fix) {
                    const newNode = atRule.clone();
                    newNode.params = newNode.params.replace(
                        new RegExp(currentExtension.replace('.', '\\.') + `(.*['"]\\)?)$`),
                        '$1',
                    );
                    atRule.replaceWith(newNode);
                } else {
                    report({
                        message: messages.extensionBlocked(atRule.toString()),
                        node: atRule,
                        word: atRule.toString(),
                    });
                }
            }
        });
    },
});
