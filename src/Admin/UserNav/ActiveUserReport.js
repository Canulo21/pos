import { useEffect, useState } from "react";
import { UserCheck } from "lucide-react";
import axios from "axios";

function ActiveUserReport() {
  const [activeUser, setActiveUser] = useState(0);

  const fetchActiveUser = () => {
    try {
      axios.get("/activeUsers").then((res) => {
        const pendingData = res.data.length;
        setActiveUser(pendingData);
      });
    } catch (err) {}
  };

  useEffect(() => {
    fetchActiveUser();
  }, []);

  return (
    <>
      <div className="bg-slate-50 py-2 px-5 shadow-lg dashboard-icon">
        <div className="flex items-center gap-2 mb-2">
          <UserCheck size={50} color="#94a3b8" />
          <p className="text-5xl font-semibold drop-shadow-sm">{activeUser}</p>
        </div>
        <p className="text-sm text-slate-400 font-medium">Active Users</p>
      </div>
    </>
  );
}

export default ActiveUserReport;
