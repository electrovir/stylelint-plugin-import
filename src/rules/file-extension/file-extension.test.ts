import {testDefaultRule, DefaultOptionMode} from 'stylelint-rule-creator';
import {pluginPath} from '../../plugin-util';
import {fileExtensionRule, FileExtensionRuleOptions} from './file-extension.rule';

testDefaultRule({
    rule: fileExtensionRule,
    pluginPath: pluginPath,
    tests: [
        {
            ruleOptions: true,
            fix: true,
            description: 'defaults work as expected',
            accept: [
                {code: `@import 'fileNameHere${fileExtensionRule.defaultOptions.extension}';`},
            ],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message: fileExtensionRule.messages.extensionRequired(
                        "@import 'fileNameHere'",
                        fileExtensionRule.defaultOptions.extension,
                    ),
                    fixed: "@import 'fileNameHere.css';",
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.REQUIRE,
                extension: '.less',
            },
            fix: true,
            description: 'defaults work as expected',
            accept: [{code: `@import 'fileNameHere.less';`}],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message: fileExtensionRule.messages.extensionRequired(
                        "@import 'fileNameHere'",
                        '.less',
                    ),
                    fixed: "@import 'fileNameHere.less';",
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
            } as FileExtensionRuleOptions,
            fix: true,
            description: 'defaults work as expected',
            accept: [{code: `@import 'fileNameHere';`}],
            reject: [
                {
                    code: "@import 'fileNameHere.css';",
                    message: fileExtensionRule.messages.extensionBlocked(
                        "@import 'fileNameHere.css'",
                    ),
                    fixed: "@import 'fileNameHere';",
                },
            ],
        },
    ],
});
