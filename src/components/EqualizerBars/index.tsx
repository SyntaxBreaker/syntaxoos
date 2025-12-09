function EqualizerBars() {
  return (
    <div className="h-full flex flex-row gap-8 items-center justify-center">
      <div className="h-24 w-6 animate-pulse-wave [animation-delay:0.25s] bg-teal-400"></div>
      <div className="h-24 w-6 animate-pulse-wave [animation-delay:0.5s] bg-orange-400"></div>
      <div className="h-24 w-6 animate-pulse-wave [animation-delay:0.75s] bg-lime-400"></div>
      <div className="h-24 w-6 animate-pulse-wave [animation-delay:1s] bg-emerald-400"></div>
      <div className="h-24 w-6 animate-pulse-wave [animation-delay:1.25s] bg-violet-400"></div>
      <div className="h-24 w-6 animate-pulse-wave [animation-delay:1.5s] bg-rose-400"></div>
    </div>
  );
}

export default EqualizerBars;
