const API_KEY = "AIzaSyAdshhFNIsCOPlykHHrPWJ1JzK1LqYvbeY" ;

const joke = document.getElementById("joke");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const category = document.getElementById("category");
const themeBtn = document.getElementById("themeBtn");



const generateJoke = async () => {

  joke.innerText = "Generating joke... 😂";

  const selectedCategory = category.value;

  const prompt = `Tell me one short clean ${selectedCategory} joke`;

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
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (result) {

      joke.innerText = result;

    } else {

      joke.innerText = "No joke found 😢";

    }

  } catch (error) {

    console.log(error);

    joke.innerText = "Failed to generate joke 😢";

  }

};



generateBtn.addEventListener("click", generateJoke);



copyBtn.addEventListener("click", () => {

  navigator.clipboard.writeText(joke.innerText);

  copyBtn.innerText = "Copied ✅";

  setTimeout(() => {

    copyBtn.innerText = "Copy Joke";

  }, 2000);

});



themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});