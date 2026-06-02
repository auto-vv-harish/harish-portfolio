import SongUploader from "./SongUploader";

const AdminPanel = () => {
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 z-40">
      <SongUploader />

      <button
        onClick={handleLogout}
        className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;