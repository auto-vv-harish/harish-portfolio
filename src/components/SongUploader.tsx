import { useState } from "react";
import { supabase } from "../lib/supabase";

const SongUploader = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  
  const handleUpload = async () => {
  if (!file) {
    alert("Select a song");
    return;
  }

  const fileExtension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExtension}`;

  // Upload file to storage
  const { error: uploadError } = await supabase.storage
    .from("songs")
    .upload(fileName, file);

  if (uploadError) {
    console.log("Upload Error:", uploadError);
    alert(uploadError.message);
    return;
  }

let coverImageUrl = "";

if (coverImage) {
  const imageName =
    `${crypto.randomUUID()}.${coverImage.name.split(".").pop()}`;

 const { error: coverError } = await supabase.storage
  .from("song-covers")
  .upload(imageName, coverImage);

if (coverError) {
  console.error(coverError);
  alert(coverError.message);
  return;
}

  const { data: imageData } =
    supabase.storage
      .from("song-covers")
      .getPublicUrl(imageName);

  coverImageUrl =
    imageData.publicUrl;
}

  // Get public URL
  const { data } = supabase.storage
    .from("songs")
    .getPublicUrl(fileName);


  // Save song details in DB
  const { error: insertError } = await supabase
    .from("songs")
    .insert([
      {
        title,
        description,
        audio_url: data.publicUrl,
        cover_image_url: coverImageUrl,
      },
    ]);

 

  if (insertError) {
    alert(insertError.message);
    return;
  }

  alert("Song Uploaded Successfully");

  setTitle("");
  setDescription("");
  setFile(null);
  setCoverImage(null);
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

<div className="mt-4">
  <label className="block text-gray-300 mb-2">
    🎵 Audio File *
  </label>

  <input
    type="file"
    accept="audio/*"
    onChange={(e) =>
      setFile(e.target.files?.[0] || null)
    }
    className="w-full text-gray-300"
  />

  {file && (
    <p className="text-cyan-400 mt-2 text-sm">
      Selected: {file.name}
    </p>
  )}
</div>

<div className="mt-4">
  <label className="block text-gray-300 mb-2">
    🖼️ Cover Image (Optional)
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setCoverImage(e.target.files?.[0] || null)
    }
    className="w-full text-gray-300"
  />

  {coverImage && (
    <p className="text-cyan-400 mt-2 text-sm">
      Selected: {coverImage.name}
    </p>
  )}
</div>
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