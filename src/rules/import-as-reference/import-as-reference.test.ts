import {DefaultOptionMode, testDefaultRule} from 'stylelint-rule-creator';
import {pluginPath} from '../../plugin-util';
import {importAsReferenceRule} from './import-as-reference.rule';

testDefaultRule({
    rule: importAsReferenceRule,
    pluginPath: pluginPath,
    tests: [
        {
            ruleOptions: true,
            description: 'defaults work as expected',
            accept: [{code: "@import (reference) 'fileNameHere';"}],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message:
                        importAsReferenceRule.messages.referenceRequired("@import 'fileNameHere'"),
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.REQUIRE,
            },
            description: 'enforce that (reference) exists',
            accept: [{code: "@import (reference) 'fileNameHere';"}],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message:
                        importAsReferenceRule.messages.referenceRequired("@import 'fileNameHere'"),
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
            },
            accept: [
                {
                    code: "@import 'fileNameHere';",
                    description: 'blocking passes when missing the reference',
                },
            ],
            reject: [
                {
                    code: "@import (reference) 'fileNameHere';",
                    message: importAsReferenceRule.messages.referenceBlocked(
                        "@import (reference) 'fileNameHere'",
                    ),
                    description: 'blocking prevents including (reference)',
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.REQUIRE,
            },
            fix: true,
            accept: [{code: "@import (reference) 'fileNameHere';"}],
            reject: [
                {
                    code: "@import 'fileNameHere';",
                    message:
                        importAsReferenceRule.messages.referenceRequired("@import 'fileNameHere'"),
                    description: 'missing (reference) should get added',
                    fixed: "@import (reference) 'fileNameHere';",
                },
            ],
        },
        {
            ruleOptions: {
                mode: DefaultOptionMode.BLOCK,
            },
            fix: true,
            accept: [
                {
                    code: "@import 'fileNameHere';",
                    description: 'blocking passes when missing the reference',
                },
            ],
            reject: [
                {
                    code: "@import (reference) 'fileNameHere';",
                    message: importAsReferenceRule.messages.referenceBlocked(
                        "@import (reference) 'fileNameHere'",
                    ),
                    description: 'blocked (reference) should get removed',
                    fixed: "@import 'fileNameHere';",
                },
            ],
        },
    ],
});
