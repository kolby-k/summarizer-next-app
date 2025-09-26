"use client";

function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.assign("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer bg-blue-300 text-black px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
