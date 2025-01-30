(async function() {
    alert("First Auto Answering AI for Google Forms | Note it will take a few min to the AI to respond, for Secured Web (https://sites.google.com/view/securedweb)");

    console.log("🔍 Scanning Google Form...");

    const HF_API_KEY = "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";

    async function generateAIAnswer(question) {
        try {
            let response = await fetch("https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${HF_API_KEY}`
                },
                body: JSON.stringify({ inputs: question })
            });

            let data = await response.json();
            console.log("🔹 Hugging Face Response:", data);

            if (data.error) {
                console.error("❌ Hugging Face Error:", data.error);
                return "Error fetching AI answer";
            }

            let aiAnswer = data[0]?.generated_text.trim();
            if (aiAnswer) {
                let answer = aiAnswer.replace(question, "").trim();
                return answer || "Sorry, I couldn't generate a response.";
            } else {
                return "Sorry, I couldn't generate a response.";
            }
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            return "AI unavailable";
        }
    }

    let questions = document.querySelectorAll(".Qr7Oae");
    console.log("📋 Found Questions:", questions.length);

    for (let question of questions) {
        let questionTextElem = question.querySelector(".M7eMe");
        let questionText = questionTextElem ? questionTextElem.innerText.trim() : "Unknown Question";
        console.log(`🔹 Question: ${questionText}`);

        let textInput = question.querySelector("input.whsOnd, textarea");
        if (textInput) {
            let aiAnswer = await generateAIAnswer(questionText);

            if (aiAnswer) {
                textInput.value = aiAnswer;
                textInput.dispatchEvent(new Event("input", { bubbles: true }));
                console.log(`📝 Thoughtful Answer: ${aiAnswer}`);
            }
            continue;
        }

        let checkboxes = question.querySelectorAll('div[role="checkbox"], div[role="radio"]');
        if (checkboxes.length > 0) {
            checkboxes[0].click();
            console.log("✅ Selected first available option.");
        }
    }

    console.log("🚀 AI Autofill & Selection Complete!");
})();
