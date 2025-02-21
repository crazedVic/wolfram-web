<?php

// Define the folder containing the images
$imageFolder = 'images/';

// Read the API key from gemini_key.txt
$apiKeyFile = 'gemini_key.txt';
if (!file_exists($apiKeyFile)) {
    die("The file '$apiKeyFile' does not exist. Please create it and add your API key.");
}

$apiKey = trim(file_get_contents($apiKeyFile));
if (empty($apiKey)) {
    die("The API key in '$apiKeyFile' is empty. Please add your API key.");
}

// Define the API endpoint
$endpoint = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions";

// Open the results file for writing
$resultsFile = fopen('results.txt', 'w');
if (!$resultsFile) {
    die("Failed to create or open 'results.txt'.");
}

// Function to call the Qwen-VL API
function getWoodworkingDescription($imagePath, $apiKey, $endpoint) {
    // Validate and process the local image file
    if (!file_exists($imagePath)) {
        return "Error: Image file not found: " . $imagePath;
    }
    if (!is_readable($imagePath)) {
        return "Error: Image file not readable: " . $imagePath;
    }
    $fileSize = filesize($imagePath);
    $maxFileSize = 4 * 1024 * 1024; // 4 MB limit
    if ($fileSize > $maxFileSize) {
        return "Error: Image file size (" . $fileSize . " bytes) exceeds $maxFileSize bytes.";
    }

    // Convert local file to base64
    $imageData = base64_encode(file_get_contents($imagePath));
    if ($imageData === false) {
        return "Error: Could not read/encode image.";
    }
    $imageUrl = "data:image/jpeg;base64," . $imageData;

    // Define the prompt for woodworking craftsmanship
    $combinedPrompt = <<<PROMPT
Describe the woodworking craftsmanship in this image. Focus on details like:
- Joinery techniques (e.g., dovetail, mortise-and-tenon)
- Materials used (e.g., type of wood, finishes)
- Design elements (e.g., carvings, patterns)
- Overall quality and skill level demonstrated

Format the response as a concise list with bullet points.
PROMPT;

    // Prepare the request payload
    $requestPayload = [
        'model' => 'qwen-vl-max',
        'messages' => [
            [
                'role' => 'user',
                'content' => [
                    [
                        'type' => 'text',
                        'text' => $combinedPrompt,
                    ],
                    [
                        'type' => 'image_url',
                        'image_url' => [
                            'url' => $imageUrl,
                        ],
                    ],
                ],
            ],
        ],
    ];

    // Initialize cURL session
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $endpoint);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Execute the request
    $response = curl_exec($ch);

    // Check for errors
    if (curl_errno($ch)) {
        echo 'cURL Error:' . curl_error($ch) . "\n";
        curl_close($ch);
        return null;
    }

    curl_close($ch);

    // Log the raw response for debugging
    file_put_contents('api_response.log', $response . "\n", FILE_APPEND);

    // Decode the response
    $responseData = json_decode($response, true);

    // Extract and return the description
    if (isset($responseData['choices'][0]['message']['content'])) {
        return $responseData['choices'][0]['message']['content'];
    } elseif (isset($responseData['error'])) {
        // Log any error messages from the API
        file_put_contents('api_errors.log', "API Error: " . $responseData['error']['message'] . "\n", FILE_APPEND);
        return 'Error: ' . $responseData['error']['message'];
    } else {
        return 'No description available.';
    }
}

// Scan the images folder
if (!is_dir($imageFolder)) {
    die("The folder '$imageFolder' does not exist.");
}

$images = glob($imageFolder . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

if (empty($images)) {
    die("No images found in the folder '$imageFolder'.");
}

// Process each image
foreach ($images as $image) {
    $filename = basename($image); // Get the filename

   // fwrite($resultsFile, "Processing: $filename\n");

    // Get the description from the API
    $description = getWoodworkingDescription($image, $apiKey, $endpoint);

    // Write the result to the file
    fwrite($resultsFile, "$filename\n $description\n");

    // Add a delay to avoid hitting rate limits
    sleep(20); // Increase the delay to avoid exceeding rate limits
}

// Close the results file
fclose($resultsFile);

echo "All results have been saved to 'results.txt'.\n";