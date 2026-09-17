const API_KEY = "AIzaSyBZFwcXvbTvQU2tP2IC-gv9v4u_T_W7q94";

const topicInput =
  document.getElementById("topicInput");

const generateBtn =
  document.getElementById("generateBtn");

const question =
  document.getElementById("question");

const answer =
  document.getElementById("answer");



const generateQuiz = async () => {

  const topic = topicInput.value;

  
  if(topic === ""){
    alert("Please enter a topic");
    return;
  }

  question.innerText = "Loading question...";
  answer.innerText = "Loading answer...";

  
  const prompt =
  `Give me one simple question and answer about ${topic}.
  
  Format:
  Question: ...
  Answer: ...
  `;

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    
    const result =
      data.candidates[0].content.parts[0].text;

    
    const lines = result.split("\n");

    
    const [q, a] = lines;

    
    question.innerText =
      q.replace("Question:", "");

    answer.innerText =
      a.replace("Answer:", "");

  } catch (error) {

    console.log(error);

    question.innerText =
      "Failed to generate question 😢";

    answer.innerText =
      "Failed to generate answer 😢";

  }

};


generateBtn.addEventListener(
  "click",
  generateQuiz
);