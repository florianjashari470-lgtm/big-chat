const localVideo = document.getElementById('localVideo');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const stopBtn = document.getElementById('stopBtn');

let localStream = null;

// Funksioni për të ndezur kamerën lokale
async function startCamera() {
    try {
        // Kërkojmë audio dhe video nga përdoruesi
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        
        // Shfaqim pamjen tonë në dritaren "localVideo"
        localVideo.srcObject = localStream;
        
        // Ndryshojmë gjendjen e butonave
        startBtn.disabled = true;
        nextBtn.disabled = false;
        stopBtn.disabled = false;
        
        console.log("Kamera dhe mikrofoni u aktivizuan me sukses!");
    } catch (error) {
        console.error("Gabim gjatë qasjes në kamerë/mikrofon:", error);
        alert("Ju lutem jepni leje për kamerën që BigChat të funksionojë!");
    }
}

// Funksioni për të ndalur kamerën
function stopCamera() {
    if (localStream) {
        // Ndalim të gjitha 'tracks' (video dhe audio)
        localStream.getTracks().forEach(track => track.stop());
        localVideo.srcObject = null;
    }
    
    startBtn.disabled = false;
    nextBtn.disabled = true;
    stopBtn.disabled = true;
}

// Event Listeners për butonat
startBtn.addEventListener('click', startCamera);
stopBtn.addEventListener('click', stopCamera);

nextBtn.addEventListener('click', () => {
    console.log("Duke kërkuar personin tjetër... (Këtë pjesë do ta lidhim me server)");
    // Këtu më vonë do të thërrasim logjikën e serverit për të ndërruar person
});
