import {
    createDefaultRule,
    DefaultOptionMode,
    doesMatchLineExceptions,
} from 'stylelint-rule-creator';
import {prefix} from '../../plugin-util';

const messages = {
    referenceRequired(line: string) {
        return `Missing "(reference)" in ${line}`;
    },
    referenceBlocked(line: string) {
        return `"(reference)" not allowed in ${line}`;
    },
};

const paramReferenceCheckString = '(reference) ';

export const importAsReferenceRule = createDefaultRule<typeof messages>({
    ruleName: `${prefix}/import-as-reference`,
    messages,
    defaultOptions: {
        mode: DefaultOptionMode.REQUIRE,
    },
    ruleCallback: (report, messages, {ruleOptions, root, context, exceptionRegExps}) => {
        root.walkAtRules('import', (atRule) => {
            if (doesMatchLineExceptions(atRule, exceptionRegExps)) {
                return;
            }

            const hasReference = atRule.params.startsWith(paramReferenceCheckString);

            if (ruleOptions.mode === DefaultOptionMode.REQUIRE && !hasReference) {
                if (context.fix) {
                    const newNode = atRule.clone();
                    newNode.params = paramReferenceCheckString + newNode.params;
                    atRule.replaceWith(newNode);
                } else {
                    report({
                        message: messages.referenceRequired(atRule.toString()),
                        node: atRule,
                        word: atRule.toString(),
                    });
                }
            } else if (ruleOptions.mode === DefaultOptionMode.BLOCK && hasReference) {
                if (context.fix) {
                    const newNode = atRule.clone();
                    newNode.params = newNode.params.replace(paramReferenceCheckString, '');
                    atRule.replaceWith(newNode);
                } else {
                    report({
                        message: messages.referenceBlocked(atRule.toString()),
                        node: atRule,
                        word: atRule.toString(),
                    });
                }
            }
        });
    },
});
