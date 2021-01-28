// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import { Uri } from "vscode";
import { ILinkedTemplateReference } from "../../../ILinkedTemplateReference";
import { NormalizedMap } from "../../../util/NormalizedMap";
import { IParameterDefinition } from "../../parameters/IParameterDefinition";
import { DeploymentTemplateDoc } from "../DeploymentTemplateDoc";

export function getParameterDefinitionsFromLinkedTemplate(
    linkedTemplate: ILinkedTemplateReference,
    allLoadedTemplates: NormalizedMap<Uri, DeploymentTemplateDoc>
): IParameterDefinition[] {
    const dt = allLoadedTemplates.get(Uri.parse(linkedTemplate.fullUri, true)); //asdf
    return dt?.topLevelScope.parameterDefinitionsSource.parameterDefinitions.slice() // clone
        ?? [];
}