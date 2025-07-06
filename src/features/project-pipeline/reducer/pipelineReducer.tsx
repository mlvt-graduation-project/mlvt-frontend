import { TranslateLanguage } from 'src/types/Translation'
import {
    PipelineAction,
    PipelineInputs,
    PipelineState,
    PipelineType,
} from '../types'

export const initialState: PipelineState = {
    selectedPipeline: PipelineType.VideoTranslation,
    inputs: {
        sourceLanguage: TranslateLanguage.English,
        targetLanguage: TranslateLanguage.Vietnamese,
    },
    isGenerating: false,
    results: null,
    error: null,
    pollingInfo: null,
}

const defaultInputs: Partial<Record<PipelineType, Partial<PipelineInputs>>> = {
    video_translation: {
        sourceLanguage: TranslateLanguage.English,
        targetLanguage: TranslateLanguage.Vietnamese,
    },
    text_generation: {
        text: '',
        sourceLanguage: TranslateLanguage.English,
    },
    text_translation: {
        text: '',
        sourceLanguage: TranslateLanguage.English,
        targetLanguage: TranslateLanguage.Vietnamese,
    },
    voice_generation: {
        text: '',
        sourceLanguage: TranslateLanguage.English,
        voice: 'build_in',
        buildInVoiceId: '',
        customVoiceFile: null,
    },

    lip_synchronization: {
        video: null,
        audio: null,
        sourceLanguage: TranslateLanguage.English,
        model: 'Model 1', // Default model, can be changed by user
    },
}
// 2. Define the Reducer Function
// This is a pure function that takes the current state and an action,
// and returns the *new* state. It never modifies the original state.
export const pipelineReducer = (
    state: PipelineState,
    action: PipelineAction,
): PipelineState => {
    switch (action.type) {
        case 'SET_PIPELINE': {
            const newPipeline = action.payload

            return {
                ...initialState,
                selectedPipeline: newPipeline,
                inputs: defaultInputs[newPipeline] || {},
            }
        }

        case 'UPDATE_INPUT':
            return {
                ...state, // ...copying all existing state properties.
                inputs: {
                    // ...but create a new 'inputs' object.
                    ...state.inputs, // Copy all existing inputs.
                    // And then set or overwrite the specific field that was changed.
                    // [action.payload.field] is a "computed property name".
                    [action.payload.field]: action.payload.value,
                },
                // If the user is changing inputs, any previous result or error is now outdated.
                // Clearing them provides a better user experience.
                results: null,
                error: null,
            }

        // Action: The 'Generate' button was clicked.
        case 'START_GENERATION':
            return {
                ...state,
                isGenerating: true,
                error: null,
                results: null,
                pollingInfo: null,
            }

        // Action to handle the start of polling
        case 'START_POLLING':
            return {
                ...state,
                isGenerating: true, 
                pollingInfo: action.payload,
            }

        // Action: The API call finished successfully.
        case 'GENERATION_SUCCESS':
            return {
                ...state,
                isGenerating: false,
                results: action.payload,
                pollingInfo: null,
            }

        // Action: The API call failed.
        case 'GENERATION_FAILURE':
            return {
                ...state,
                isGenerating: false, // Turn off loading.
                error: action.payload, 
                pollingInfo: null, // Clear any polling info.
            }

        // Default case for any unhandled actions.
        default:
            return state
    }
}
