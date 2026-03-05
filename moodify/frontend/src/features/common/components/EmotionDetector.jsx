import { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import "../styles/emotion.scss";
import useSong from "../../song/hooks/useSong";
function EmotionDetector() {
  const videoRef = useRef(null);
  const [detect, setdetect] = useState("");
  const [expression, setExpression] = useState("Detecting...");
  const { getSongByMood, setdetectedSong } = useSong();

  useEffect(() => {
    if (!detect) return;
    getSongByMood(detect);
    setdetectedSong(detect);
  }, [detect]);

  function distance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  function detectEmotion(landmarks) {
    const upperLip = landmarks[13];
    const lowerLip = landmarks[14];

    const leftMouth = landmarks[61];
    const rightMouth = landmarks[291];

    const leftEyeTop = landmarks[159];
    const leftEyeBottom = landmarks[145];

    const mouthOpen = distance(upperLip, lowerLip);
    const mouthWidth = distance(leftMouth, rightMouth);
    const eyeOpen = distance(leftEyeTop, leftEyeBottom);

    // console.log("mouthOpen:", mouthOpen);
    // console.log("mouthWidth:", mouthWidth);
    // console.log("eyeOpen:", eyeOpen);

    // Surprised
    if (mouthOpen > 0.05 && eyeOpen > 0.02) {
      return "Surprised";
    }

    // Happy

    if (mouthWidth > 0.07 && mouthOpen > 0.02) {
      return "Happy";
    }

    // Sad
    if (mouthWidth < 0.2) {
      return "Sad";
    }

    return "Neutral";
  }

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        const emotion = detectEmotion(landmarks);
        setExpression(emotion);
      }
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  return (
    <div className="container">
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted playsInline />
        {/* Optional: Add a scanning overlay line here */}
      </div>

      <h2 className="expression-text">{expression || "Scanning..."}</h2>

      <div className="controls">
        <button
          className="detectBtn"
          onClick={() => {
            setdetect(expression.toLowerCase());
          }}
        >
          Detect {expression}
        </button>
      </div>
    </div>
  );
}

export default EmotionDetector;
