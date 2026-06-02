import { useState } from "react";
import { supabase } from "../lib/supabase";

const SongUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a song");
      return;
    }

    const fileExtension = file.name.split(".").pop();

const fileName =
  `${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("songs")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from("songs")
      .getPublicUrl(fileName);

      const {
  data: { user },
} = await supabase.auth.getUser();

console.log("Current User:", user);

console.log(user);  



const { error: insertError } = await supabase
  .from("songs")
  .insert([
    {
      title,
      description,
      audio_url: data.publicUrl,
    },
  ]);

console.log("Insert Error:", insertError);

if (insertError) {
  alert(insertError.message);
  return;
}

    alert("Song Uploaded Successfully");

    setTitle("");
    setDescription("");
    setFile(null);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl mt-4">
      <h2 className="text-xl font-bold text-cyan-400 mb-4">
        Upload Song
      </h2>

      <input
        type="text"
        placeholder="Song Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 mb-3 rounded bg-gray-800"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 mb-3 rounded bg-gray-800"
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) =>
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={handleUpload}
        className="bg-cyan-500 px-4 py-2 rounded mt-4"
      >
        Upload Song
      </button>
    </div>
  );
};

export default SongUploader;