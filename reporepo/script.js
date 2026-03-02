const btn = document.getElementById("voiceBtn");
let icon = document.querySelector("#voiceBtn p");
let butt = document.querySelector("#voiceBtn span");

let isListening = false;   
let greeted = false;      
let cvDownloaded = false;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

btn.addEventListener("click", () => {
    icon.classList.toggle("close");
    btn.classList.toggle("animate");
    
    setTimeout(() =>{
        icon.classList.remove("close")
        btn.classList.remove("animate")
        recognition.stop()
    },3000)
    if (!isListening) {
        // 🔊 BAŞLA

        if (!greeted) {
            const greeting = new SpeechSynthesisUtterance("Hi Toğrul");
            greeting.lang = "en-US";

            window.speechSynthesis.speak(greeting);

            greeting.onend = () => {
                recognition.start();
            };

            greeted = true;
        } else {
            recognition.start();
        }

        isListening = true;

    } else {
        // ⛔ DAYAN
        recognition.stop();
        isListening = false;
    }

});

recognition.onresult = function (event) {
    const speech = event.results[0][0].transcript.toLowerCase();

    if (speech.includes("about")) {
        document.getElementById("about")
            .scrollIntoView({ behavior: "smooth" });

        const response = new SpeechSynthesisUtterance("Here is About Toğrul");
        window.speechSynthesis.speak(response);
    }

    if (speech.includes("contact")) {
        document.getElementById("contact")
            .scrollIntoView({ behavior: "smooth" });

        const response = new SpeechSynthesisUtterance("Here is Contact with Toğrul");
        window.speechSynthesis.speak(response);
    }
    if (speech.includes("certificates")) {
        document.getElementById("certificates")
            .scrollIntoView({ behavior: "smooth" });

        const response = new SpeechSynthesisUtterance("Here are Toğrul's certificates");
        window.speechSynthesis.speak(response);
    }

    if (speech.includes("projects")) {
        document.getElementById("projects")
            .scrollIntoView({ behavior: "smooth" });

        const response = new SpeechSynthesisUtterance("Here is Toğrul's projects");
        window.speechSynthesis.speak(response);
    }
    if (speech.includes("download cv")) {

        if (!cvDownloaded) {
            document.getElementById("downloadCV").click();

            const response = new SpeechSynthesisUtterance(
                "Your CV is being downloaded"
            );
            window.speechSynthesis.speak(response);

            cvDownloaded = true; // 🔒 artıq yükləndi
        } else {
            const response = new SpeechSynthesisUtterance(
                "The CV has already been downloaded"
            );
            window.speechSynthesis.speak(response);
        }
    }
};