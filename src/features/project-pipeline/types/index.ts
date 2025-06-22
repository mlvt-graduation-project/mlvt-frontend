// The 5 main options for the pipeline
export type PipelineType = 
  | 'video_translation' 
  | 'text_generation' 
  | 'text_translation' 
  | 'voice_generation' 
  | 'lip_synchronization';

// Represents the state of all possible input fields
export interface PipelineInputs {
  video?: string | File | null; 
  audio?: string | File | null;
  text?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  language?: string; // For single-language contexts
  voice?: 'build_in' | 'custom';
  buildInVoiceId?: string;
  customVoiceFile?: File | null;
  model?: string;
}

// The complete state for our page
export interface PipelineState {
  selectedPipeline: PipelineType;
  inputs: PipelineInputs;
  isGenerating: boolean;
  results: any; // Define a more specific type based on your API response
  error: string | null;
}

// Actions that can be dispatched to update the state
export type PipelineAction =
  | { type: 'SET_PIPELINE'; payload: PipelineType }
  | { type: 'UPDATE_INPUT'; payload: { field: keyof PipelineInputs; value: any } }
  | { type: 'START_GENERATION' }
  | { type: 'GENERATION_SUCCESS'; payload: any }
  | { type: 'GENERATION_FAILURE'; payload: string };