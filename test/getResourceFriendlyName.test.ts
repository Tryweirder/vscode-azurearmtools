// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import * as assert from "assert";
import { getResourcesInfo } from "../extension.bundle";
import { IDeploymentTemplateResource } from "./support/diagnostics";
import { parseTemplate } from "./support/parseTemplate";

suite("resource friendly names asdf", () => {
    function createFriendlyNameTest(testName: string, resource: Partial<IDeploymentTemplateResource>, expected: string): void {
        test(testName, async () => {
            let keepTestNameInClosure = testName;
            keepTestNameInClosure = keepTestNameInClosure;

            const dt = await parseTemplate({
                resources: [
                    resource
                ]
            });
            const infos = getResourcesInfo({
                scope: dt.topLevelScope,
                recognizeDecoupledChildren: false
            });
            const actual = infos[0].getFriendlyName();
            assert.strictEqual(actual, expected);
        });
    }

    suite("displayName", () => {

        createFriendlyNameTest(
            "use displayName if exists",
            {
                name: 'resource1',
                type: 'Microsoft.abc/def',
                tags: {
                    displayName: 'my display name'
                }
            },
            'my display name'
        );

        createFriendlyNameTest(
            "bad displayname - don't use",
            {
                name: 'resource1',
                type: 'Microsoft.abc/def',
                // tslint:disable-next-line: no-any
                tags: <any>{
                    displayName: []
                }
            },
            '"resource1" (def)'
        );

        createFriendlyNameTest(
            "bad tags - don't use",
            {
                name: 'resource1',
                type: 'Microsoft.abc/def',
                // tslint:disable-next-line: no-any
                tags: <any>[
                    {
                        displayName: 'my display name'
                    }]
            },
            '"resource1" (def)'
        );
    });

    suite("asdf", () => {
        //asdf
    });
});