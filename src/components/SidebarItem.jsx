const SidebarItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center px-4 py-3 rounded-r-full cursor-pointer ${
      active ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
    }`}
  >
    <span className="mr-4 text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </div>
);
export default SidebarItem;
