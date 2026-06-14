import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

interface Song {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  cover_image_url: string;
}



const Songs = () => {
 const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});
 const shouldContinuePlayback = useRef(false);
 const isChangingTrack = useRef(false);
 const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  setIsAdmin(
    localStorage.getItem("isAdmin") === "true"
  );
}, []);
  const [songs, setSongs] = useState<Song[]>([]);

const [editingSong, setEditingSong] =
  useState<Song | null>(null);

  useEffect(() => {
    fetchSongs();
  }, []);

const saveSong = async () => {
  if (!editingSong) return;

  console.log("Updating:", editingSong);

  const { data, error } = await supabase
    .from("songs")
    .update({
      title: editingSong.title,
      description: editingSong.description,
    })
    .eq("id", editingSong.id)
    .select();

  console.log("Updated Data:", data);
  console.log("Update Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  await fetchSongs();
  setEditingSong(null);

  alert("Song Updated Successfully");
};
 


  const fetchSongs = async () => {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setSongs(data || []);
  };

const handleDelete = async (
  id: number
) => {
  if (!confirm("Delete song?"))
    return;

  const { error } = await supabase
  .from("songs")
  .delete()
  .eq("id", id);

if (error) {
  alert(error.message);
  return;
}

await fetchSongs();

alert("Song Deleted Successfully");
};

const handleAudioPlay = (playingSongId: number) => {
  shouldContinuePlayback.current = true;

  Object.entries(audioRefs.current).forEach(([songId, audio]) => {
    if (Number(songId) !== playingSongId && audio) {
      isChangingTrack.current = true;
      audio.pause();
      isChangingTrack.current = false;
    }
  });
};

const handleAudioPause = (pausedSongId: number) => {
  const audio = audioRefs.current[pausedSongId];

  if (!isChangingTrack.current && audio && !audio.ended) {
    shouldContinuePlayback.current = false;
  }
};

const handleAudioEnded = async (endedSongId: number) => {
  if (!shouldContinuePlayback.current || songs.length === 0) {
    return;
  }

  const currentIndex = songs.findIndex((song) => song.id === endedSongId);
  const nextSong = songs[(currentIndex + 1) % songs.length];
  const nextAudio = audioRefs.current[nextSong.id];

  if (!nextAudio) {
    return;
  }

  isChangingTrack.current = true;
  nextAudio.currentTime = 0;

  try {
    await nextAudio.play();
  } catch (error) {
    shouldContinuePlayback.current = false;
    console.error("Unable to continue playlist:", error);
  } finally {
    isChangingTrack.current = false;
  }
};

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
      {songs.length === 0 && (
  <p className="text-center text-gray-400">
    No songs uploaded yet.
  </p>
)}

      <div className="max-w-5xl mx-auto space-y-8 mt-12">
        {songs.map((song) => (
          <div
  key={song.id}
  className="w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-6"
>
            {song.cover_image_url && (
  <img
    src={song.cover_image_url}
    alt={song.title}
    className="w-full h-60 object-cover rounded-xl mb-4"
  />
)}
            <h3 className="text-2xl font-bold text-cyan-400">
              🎵 {song.title}
            </h3>

            <p className="text-gray-400 mt-3">
              {song.description}
            </p>

            <audio
              ref={(audio) => {
                audioRefs.current[song.id] = audio;
              }}
              controls
              controlsList="nodownload"
              className="w-full mt-6"
              onPlay={() => handleAudioPlay(song.id)}
              onPause={() => handleAudioPause(song.id)}
              onEnded={() => handleAudioEnded(song.id)}
            >
              <source
                src={song.audio_url}
                type="audio/mpeg"
              />
            </audio>
           {isAdmin && (
  <div className="flex gap-2 mt-4">
    <button
      onClick={() => setEditingSong(song)}
      className="bg-yellow-500 px-3 py-2 rounded"
    >
      ✏️ Edit
    </button>

    <button
      onClick={() => handleDelete(song.id)}
      className="bg-red-600 px-3 py-2 rounded"
    >
      🗑️ Delete
    </button>
  </div>
)}
          </div>
        ))}
      </div>

      {editingSong && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-xl w-[400px]">
      <h3 className="text-xl font-bold mb-4">
        Edit Song
      </h3>

      <input
        value={editingSong.title}
        onChange={(e) =>
          setEditingSong({
            ...editingSong,
            title: e.target.value,
          })
        }
        className="w-full p-2 rounded bg-gray-800 mb-3"
      />

     <textarea
  value={editingSong.description}
  onChange={(e) => {
    console.log("New Description:", e.target.value);

    setEditingSong({
      ...editingSong,
      description: e.target.value,
    });
  }}
  className="w-full p-2 rounded bg-gray-800 mb-3"
/>

      <div className="flex gap-2">
        <button
          onClick={saveSong}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={() => setEditingSong(null)}
          className="bg-gray-600 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </section>
  );
};

export default Songs;
