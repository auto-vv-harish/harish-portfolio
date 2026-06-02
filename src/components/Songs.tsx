const Songs = () => {
  return (
    <section
      id="music"
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <h2 className="text-5xl font-bold text-center">
        🎵 Music & Creativity
      </h2>

      <p className="text-center text-gray-400 mt-4">
        Beyond engineering, I enjoy writing original songs and lyrics.
      </p>

      <div className="max-w-xl mx-auto mt-12">
        <div className="bg-white/5 border border-cyan-500/20 rounded-2xl p-6">
  <h3 className="text-2xl font-bold text-cyan-400">
    🎵 వెన్నెల వాన
  </h3>

  <p className="text-gray-400 mt-3">
    Original Telugu romantic melody written and composed by Harish Devireddy using AI.
  </p>

  <audio
    controls
    controlsList="nodownload"
    className="w-full mt-6"
  >
    <source src="/songs/vennela-vaana.mp3" type="audio/mpeg" />
  </audio>
</div>
      </div>
    </section>
  );
};

export default Songs;