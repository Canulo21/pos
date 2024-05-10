import { useEffect, useState } from "react";
import { UserCogIcon } from "lucide-react";
import axios from "axios";

function PendingUserReport() {
  const [fetchUser, setFetchUser] = useState(0);
  const fetchPendingUser = () => {
    try {
      axios.get("http://localhost:8080/pendingUsers").then((res) => {
        const pendingData = res.data.length;
        setFetchUser(pendingData);
      });
    } catch (err) {}
  };

  useEffect(() => {
    fetchPendingUser();
  }, []);
  return (
    <>
      <div className="bg-slate-50 py-2 px-5 shadow-lg relative dashboard-icon">
        <div className="flex items-center gap-2 mb-2">
          <UserCogIcon size={50} color="#94a3b8" />
          <p className="text-5xl font-semibold drop-shadow-sm">{fetchUser}</p>
        </div>
        <p className="text-sm text-slate-400 font-medium">Pending Users</p>
      </div>
    </>
  );
}

export default PendingUserReport;
