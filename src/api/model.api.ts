import { PipelineShortForm } from 'src/types/Project'
import { GetModelCost } from 'src/types/Response/Model'
import { get } from './base.api'

export const GetPipelineCost = (
    pipeline: PipelineShortForm,
): Promise<GetModelCost> => {
    const param = String(pipeline).toUpperCase()
    return get(`/feature-flag/pipeline-model-cost`, {
        pipeline: param,
    })
}
