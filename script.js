const API_KEY = "AIzaSyCtkfjE-K_dOGwKFUcNqCROnSx3A1JwD1A";



const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answerOutput = document.getElementById("answerOutput");

const summaryInput = document.getElementById("summaryInput");
const summaryBtn = document.getElementById("summaryBtn");
const summaryOutput = document.getElementById("summaryOutput");

const ideaInput = document.getElementById("ideaInput");
const ideaBtn = document.getElementById("ideaBtn");
const ideaOutput = document.getElementById("ideaOutput");

const defineInput = document.getElementById("defineInput");
const defineBtn = document.getElementById("defineBtn");
const defineOutput = document.getElementById("defineOutput");




const getAIResponse = async (prompt) => {

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the following text:\n${prompt}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    if(data.candidates){

      return data.candidates[0].content.parts[0].text;

    }

    else{

      return "No response from AI";

    }

  }

  catch(error){

    console.log(error);

    return "Something went wrong";

  }

};

summaryBtn.addEventListener("click", async () => {

  const text = summaryInput.value;

  const result = await getAIResponse(text);

  summaryOutput.innerText = result;

});

ideaBtn.addEventListener("click", async () => {

  const topic = ideaInput.value;

  const result = await getAIResponse(
    `Give ideas about: ${topic}`
  );

  ideaOutput.innerText = result;

});

defineBtn.addEventListener("click", async () => {

  const word = defineInput.value;

  const result = await getAIResponse(
    `Define this word: ${word}`
  );

  defineOutput.innerText = result;

});


