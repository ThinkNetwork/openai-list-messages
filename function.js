window.function = async function(api_key, thread_id, run_id, order, limit, after, before) 
{
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Thread ID
    if (!thread_id.value) {
        return "Error: Thread ID is required.";
    }

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (run_id.value) queryParams.append("run_id", run_id.value);
    if (order.value) queryParams.append("order", order.value);
    if (limit.value) queryParams.append("limit", limit.value);
    if (after.value) queryParams.append("after", after.value);
    if (before.value) queryParams.append("before", before.value);

    // API endpoint URL
    const apiUrl = `https://api.openai.com/v1/threads/${thread_id.value}/messages?${queryParams.toString()}`;

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key.value}`,
                "OpenAI-Beta": "assistants=v2"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
