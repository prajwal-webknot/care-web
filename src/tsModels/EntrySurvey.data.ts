export interface EntrySurveyRequest {

}

export interface EntrySurveyResponse {
  data?: {
    survey: {
      description: string,
      choices: string[];
    };
  };
}
export interface PostSurveyRequest {

}

export interface PostSurveyResponse {
}