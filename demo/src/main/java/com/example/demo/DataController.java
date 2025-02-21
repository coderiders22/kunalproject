package com.example.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bfhl")
public class DataController {

    @PostMapping
    public DataResponse processData(@RequestBody DataRequest request) {
        List<String> numbers = request.getData().stream()
                .filter(s -> s.matches("\\d+")) // Filter numbers
                .collect(Collectors.toList());

        List<String> alphabets = request.getData().stream()
                .filter(s -> s.matches("[a-zA-Z]")) // Filter alphabets
                .collect(Collectors.toList());

        List<String> highestAlphabet = alphabets.isEmpty() ?
                List.of() : List.of(alphabets.stream().max(String::compareToIgnoreCase).orElse(""));

        return new DataResponse(
                true,
                "https://github.com/kunalkhare21",
                "kunalkhare123456@gmail.com",
                "2236861",
                numbers,
                alphabets,
                highestAlphabet
        );
    }

    @GetMapping
    public String getOperationCode() {
        return "{\"operation_code\":1}";
    }
}
