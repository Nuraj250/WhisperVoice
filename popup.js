const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptionDiv = document.getElementById('transcription');

let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    transcriptionDiv.textContent = "Listening...";
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  recognition.onresult = (event) => {
    let interimTranscription = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        transcriptionDiv.textContent += event.results[i][0].transcript;
      } else {
        interimTranscription += event.results[i][0].transcript;
      }
    }
    transcriptionDiv.textContent = interimTranscription;
  };

  recognition.onerror = (event) => {
    console.error("Error occurred in recognition: ", event.error);
  };

  recognition.onend = () => {
    transcriptionDiv.textContent = "Press 'Start' and begin speaking...";
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };
}

startBtn.onclick = () => {
  recognition.start();
};

stopBtn.onclick = () => {
  recognition.stop();
};
