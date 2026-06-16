import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import { FaHeart, FaPlay } from "react-icons/fa";

interface Song {
  id: number;
  title: string;
  description: string;
  audio_url: string;
  cover_image_url: string;
  play_count?: number;
  likes?: number;
}



const Songs = () => {
 const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({});
 const shouldContinuePlayback = useRef(false);
 const isChangingTrack = useRef(false);
 const countedPlaybackIds = useRef<Set<number>>(new Set());
 const songsRef = useRef<Song[]>([]);
 const hasShownMetricError = useRef(false);
 const [isAdmin, setIsAdmin] = useState(false);
 const [likedSongIds, setLikedSongIds] = useState<number[]>([]);

useEffect(() => {
  setIsAdmin(
    localStorage.getItem("isAdmin") === "true"
  );

  const storedLikes = localStorage.getItem("likedSongIds");

  if (storedLikes) {
    setLikedSongIds(JSON.parse(storedLikes));
  }
}, []);
  const [songs, setSongs] = useState<Song[]>([]);

const [editingSong, setEditingSong] =
  useState<Song | null>(null);
const [editingCoverImage, setEditingCoverImage] =
  useState<File | null>(null);
const [isSavingSong, setIsSavingSong] = useState(false);

  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);

  useEffect(() => {
    if (songs.length === 0 || likedSongIds.length === 0) {
      return;
    }

    const validLikedSongIds = likedSongIds.filter((songId) => {
      const song = songs.find((currentSong) => currentSong.id === songId);
      return !song || (song.likes || 0) > 0;
    });

    if (validLikedSongIds.length !== likedSongIds.length) {
      setLikedSongIds(validLikedSongIds);
      localStorage.setItem("likedSongIds", JSON.stringify(validLikedSongIds));
    }
  }, [songs, likedSongIds]);

  useEffect(() => {
    fetchSongs();
  }, []);

const saveSong = async () => {
  if (!editingSong) return;

  setIsSavingSong(true);
  console.log("Updating:", editingSong);

  let coverImageUrl = editingSong.cover_image_url;

  if (editingCoverImage) {
    const imageName =
      `${crypto.randomUUID()}.${editingCoverImage.name.split(".").pop()}`;

    const { error: coverError } = await supabase.storage
      .from("song-covers")
      .upload(imageName, editingCoverImage);

    if (coverError) {
      setIsSavingSong(false);
      alert(coverError.message);
      return;
    }

    const { data: imageData } = supabase.storage
      .from("song-covers")
      .getPublicUrl(imageName);

    coverImageUrl = imageData.publicUrl;
  }

  const { data, error } = await supabase
    .from("songs")
    .update({
      title: editingSong.title,
      description: editingSong.description,
      cover_image_url: coverImageUrl,
    })
    .eq("id", editingSong.id)
    .select();

  console.log("Updated Data:", data);
  console.log("Update Error:", error);

  if (error) {
    setIsSavingSong(false);
    alert(error.message);
    return;
  }

  await fetchSongs();
  setEditingSong(null);
  setEditingCoverImage(null);
  setIsSavingSong(false);

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

    const normalizedSongs = (data || []).map((song) => ({
      ...song,
      play_count: song.play_count || 0,
      likes: song.likes || 0,
    }));

    songsRef.current = normalizedSongs;
    setSongs(normalizedSongs);
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

const setSongMetric = (
  songId: number,
  field: "play_count" | "likes",
  value: number
) => {
  setSongs((currentSongs) => {
    const nextSongs = currentSongs.map((song) =>
      song.id === songId
        ? { ...song, [field]: value }
        : song
    );

    songsRef.current = nextSongs;
    return nextSongs;
  });
};

const incrementSongMetric = async (
  songId: number,
  field: "play_count" | "likes"
) => {
  const song = songsRef.current.find((currentSong) => currentSong.id === songId);
  const previousValue = song?.[field] || 0;
  const fallbackValue = (song?.[field] || 0) + 1;

  setSongMetric(songId, field, fallbackValue);

  const functionNames =
    field === "play_count"
      ? ["increment_song_play_count_v2", "increment_song_play_count"]
      : ["increment_song_likes_v2", "increment_song_likes"];

  let metricError: unknown = null;

  for (const functionName of functionNames) {
    const { data, error } = await supabase
      .rpc(functionName, { p_song_id: songId })
      .single();

    if (!error && data !== null) {
      setSongMetric(songId, field, Number(data) || fallbackValue);
      return true;
    }

    metricError = error;
  }

  console.error(`Unable to persist ${field}:`, metricError);
  setSongMetric(songId, field, previousValue);

  if (!hasShownMetricError.current) {
    hasShownMetricError.current = true;
    const errorMessage =
      metricError instanceof Error
        ? metricError.message
        : metricError &&
          typeof metricError === "object" &&
          "message" in metricError &&
          typeof metricError.message === "string"
        ? metricError.message
        : "No data returned from the metric function.";

    alert(
      `Unable to save song metrics in Supabase: ${errorMessage}`
    );
  }

  return false;
};

const incrementPlayCount = async (songId: number) => {
  if (countedPlaybackIds.current.has(songId)) {
    return;
  }

  countedPlaybackIds.current.add(songId);

  await incrementSongMetric(songId, "play_count");
};

const handleLikeSong = async (songId: number) => {
  if (likedSongIds.includes(songId)) {
    return;
  }

  const isSaved = await incrementSongMetric(songId, "likes");

  if (isSaved) {
    const nextLikedSongIds = [...likedSongIds, songId];
    setLikedSongIds(nextLikedSongIds);
    localStorage.setItem("likedSongIds", JSON.stringify(nextLikedSongIds));
  }
};

const handleAudioPlay = (playingSongId: number) => {
  shouldContinuePlayback.current = true;
  incrementPlayCount(playingSongId);

  Object.entries(audioRefs.current).forEach(([songId, audio]) => {
    if (Number(songId) !== playingSongId && audio) {
      isChangingTrack.current = true;
      audio.pause();
      countedPlaybackIds.current.delete(Number(songId));
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
  countedPlaybackIds.current.delete(endedSongId);
  const songList = songsRef.current;

  if (!shouldContinuePlayback.current || songList.length === 0) {
    return;
  }

  const currentIndex = songList.findIndex((song) => song.id === endedSongId);

  if (currentIndex === -1) {
    return;
  }

  const nextSong = songList[(currentIndex + 1) % songList.length];
  const nextAudio = audioRefs.current[nextSong.id];

  if (!nextAudio) {
    return;
  }

  isChangingTrack.current = true;
  nextAudio.currentTime = 0;
  nextAudio.load();

  try {
    await new Promise((resolve) => requestAnimationFrame(resolve));
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

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-300">
              <span className="inline-flex items-center gap-2">
                <FaPlay className="text-cyan-400" />
                {song.play_count || 0} Plays
              </span>

              <button
                onClick={() => handleLikeSong(song.id)}
                disabled={likedSongIds.includes(song.id)}
                className={`inline-flex items-center gap-2 transition ${
                  likedSongIds.includes(song.id)
                    ? "text-pink-400 cursor-not-allowed"
                    : "text-gray-300 hover:text-pink-400"
                }`}
              >
                <FaHeart />
                {song.likes || 0} Likes
              </button>
            </div>

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

      {editingSong.cover_image_url && (
        <img
          src={editingSong.cover_image_url}
          alt={editingSong.title}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      <label className="block text-gray-300 mb-2">
        Cover Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setEditingCoverImage(e.target.files?.[0] || null)
        }
        className="w-full text-gray-300 mb-3"
      />

      {editingCoverImage && (
        <p className="text-cyan-400 text-sm mb-3">
          Selected: {editingCoverImage.name}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={saveSong}
          disabled={isSavingSong}
          className="bg-green-600 px-4 py-2 rounded"
        >
          {isSavingSong ? "Saving..." : "Save"}
        </button>

        <button
          onClick={() => {
            setEditingSong(null);
            setEditingCoverImage(null);
          }}
          disabled={isSavingSong}
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
