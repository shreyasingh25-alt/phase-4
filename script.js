const API_KEY = "AIzaSyDHW7E14Vi31Ap2NOmIxxie-STJvXFY8gk";

const affirmation =
  document.getElementById("affirmation");

const newBtn =
  document.getElementById("newBtn");

let lastAffirmation = "";



const fetchAffirmation = async () => {

  affirmation.innerText =
    "Loading affirmation... 🌟";



  const randomNumber =
    Math.floor(Math.random() * 100000);



  const prompt =
    `Give me one completely different short positive affirmation.
    
    Make it unique and motivational.
    
    Random: ${randomNumber}
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



    let result =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;



    result = result.trim();



    
    if (result === lastAffirmation) {

      fetchAffirmation();

      return;

    }



    lastAffirmation = result;

    affirmation.innerText = result;

  } catch (error) {

    console.log(error);

    affirmation.innerText =
      "Failed to load affirmation 😢";

  }

};



document.addEventListener(
  "DOMContentLoaded",
  fetchAffirmation
);



newBtn.addEventListener(
  "click",
  fetchAffirmation
);