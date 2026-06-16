
(function () {
  const script = document.currentScript;

  const userId = script?.dataset?.userId;


  const theme = "dark";

  let assistantConfig = null;

  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = "http://localhost:5173/assistant.css";

  document.head.appendChild(link);

  const popup = document.createElement("div");
  popup.className = `neura-popup theme-${theme}`;

  popup.innerHTML = `
    <div class="neura-overlay"></div>
    <div class="neura-content">
        <div class="neura-top">
    
            <div class="neura-orb-wrap">
                <div class="neura-orb-glow"></div>
                <div class="neura-orb"></div>
            </div>

            <h2 class="neura-title">Hello I'm NeuraAI</h2>

            <p class="neura-sub">
                Your smart voice assistant.<br/>
                Ask anything about your website.
            </p>


            <div class="neura-status">
                Tap button to Speak
            </div>

            <div class="neura-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div class="neura-user-text"></div>
            <div class="neura-ai-text"></div>
    
        </div>


        <div class="neura-bottom">
            <button class="neura-mic">
                <img src="http://localhost:5173/mic.svg"
                    alt="mic"
                    class="neura-mic-icon"
                />
            </button>
        </div>
    </div>
    `;

  document.body.appendChild(popup);

  const button = document.createElement("button");

  button.className = `neura-btn theme-${theme}`;
  button.innerHTML = `
    <img
    src="http://localhost:5173/logo.png"
    alt="logo"
    />
    `;
  document.body.appendChild(button);

  let open = false;
  button.onclick = () => {
    open = !open;
    popup.style.display = open ? "flex" : "none";
  };
 

  const loadAssistant = async () => {
    try {
      const res = await fetch(
        `https://neuraaiserver.onrender.com/api/assistant/config/${userId}`,
      );
      const data = await res.json();
     

      if (data?.user) {
        assistantConfig = data.user;
        applyConfig();
      }
    } catch (error) {
      console.log("ERROR:");
      console.log(error);
       console.error("assistant.js fetch error:", error);
    }
  };

  const applyConfig = () => {
    if (!assistantConfig) return;
    popup.className = `neura-popup theme-${assistantConfig.theme}`;
    button.className = `neura-btn theme-${assistantConfig.theme}`;

    const title = popup.querySelector(".neura-title");
    title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;

 const subTitle = popup.querySelector(".neura-sub");
    subTitle.innerHTML = `Welcome to ${assistantConfig.businessName} <br/> Ask anything about your website.`;
  };
  loadAssistant();


  // element
  const status = popup.querySelector(".neura-status")
  const wave = popup.querySelector(".neura-wave")
  const userText = popup.querySelector(".neura-user-text")
  const aiText = popup.querySelector(".neura-ai-text")
  const mic = popup.querySelector(".neura-mic")

  // test-speech conversion
  const speak = (text) => {
    window.speechSynthesis.cancel();

    // show ai text
    aiText.innerText = text;

    status.innerText = "AI - Speaking ...."
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = "hi-IN";
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    // voice end
    speech.onend = () => {
      status.innerText = "Tap button to Speak";
      wave.style.opacity = "0";
    };

    // start speaking 
    window.speechSynthesis.speak(
      speech
    );
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

  if(SpeechRecognition){
    const recognition = new SpeechRecognition
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    mic.onclick= ()=> {
      wave.style.opacity = "1";
      status.innerText = "Listening..."
      userText.innerText = "";
      aiText.innerText = "";
      recognition.start();

    }

    recognition.onresult = (e) =>{
      const text = e.results[0][0].transcript
      userText.innerText = "You : " + text;

      recognition.stop();
      setTimeout( async () => {
        try{
          status.innerText = "Thinking..."
          const res = await fetch("https://neuraaiserver.onrender.com/api/assistant/ask" , {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body:JSON.stringify({
              message : text,
              userId 
            })
          })
          const data = await res.json()
          console.log(data);
          if(data.success){
            if(data.action === "navigate"){
              speak(data.response)
              setTimeout(() =>{
                  window.location.href = data.path
              },1500)
            }else{
              speak(data.response)
            }
          }else{
            speak("Response error please, Check your plan")
        }


        }catch(error){
          console.log(error)
          speak("AI Server Error")

        }
      },600);
    }

    recognition.onerror = () => {
      status.innerText = "Tap to Speak";
      wave.style.opacity = "0";
    }


  }else{
    status.innerText = "Speech Recognition not supported";
  }
})();
