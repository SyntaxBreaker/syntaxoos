import { useAudioStore } from "../../store/audioStore";
import EqualizerBars from "../EqualizerBars";

function MusicPlayer() {
  const audioSrc = useAudioStore((state) => state.audioSrc);

  if (!audioSrc) return null;

  return (
    <article className="flex flex-col h-full">
      <EqualizerBars />
      <audio controls src={audioSrc} autoPlay className="-mx-2" />
    </article>
  );
}

export default MusicPlayer;
