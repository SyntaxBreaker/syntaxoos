import { useAudioStore } from "../../store/audioStore";
import EqualizerBars from "../EqualizerBars";

function MusicPlayer() {
  const audioSrc = useAudioStore((state) => state.audioSrc);

  if (!audioSrc) return null;

  return (
    <div className="flex flex-col h-full">
      <EqualizerBars />
      <audio controls src={audioSrc} autoPlay className="-mx-2" />
    </div>
  );
}

export default MusicPlayer;
