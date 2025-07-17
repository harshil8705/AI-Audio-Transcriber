package com.audio.transcriber;

import org.springframework.ai.model.ApiKey;
import org.springframework.ai.openai.OpenAiAudioTranscriptionModel;
import org.springframework.ai.openai.api.OpenAiAudioApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.ResponseErrorHandler;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestClient;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AiConfig {

    @Value("${spring.ai.openai.api-key}")
    private String apiKey;

    @Value("${spring.ai.openai.base-url}")
    private String baseUrl;

    @Bean
    public OpenAiAudioTranscriptionModel transcriptionModel() {

        ApiKey openAiApiKey = () -> apiKey;

        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();

        RestClient.Builder restClientBuilder = RestClient.builder();
        WebClient.Builder webClientBuilder = WebClient.builder();
        ResponseErrorHandler errorHandler = new DefaultResponseErrorHandler();

        OpenAiAudioApi openAiAudioApi = new OpenAiAudioApi(
                baseUrl,
                openAiApiKey,
                headers,
                restClientBuilder,
                webClientBuilder,
                errorHandler
        );

        return new OpenAiAudioTranscriptionModel(openAiAudioApi);
    }

}
