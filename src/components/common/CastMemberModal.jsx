import { ChevronLeft } from "lucide-react";
import { getCastDetails } from "../../services/tmdb";

import { useEffect, useState } from "react";

export default function CastMemberModal({
  showCastModal,
  closeCastModal,
  castMemberId,
}) {
  const [castMemberDetails, setCastMemberDetails] = useState(null);

  useEffect(() => {
    if (!castMemberId) {
      return;
    }
    const fetchCastData = async () => {
      const castDetails = await getCastDetails(castMemberId);
      setCastMemberDetails(castDetails);
    };
    fetchCastData();
  }, [castMemberId]);

  console.log(castMemberDetails);
  return (
    <div
      className={`${showCastModal ? "translate-y-0" : "translate-y-full"} fixed inset-0 z-1000 bg-[var(--background)] py-2 transition-transform duration-300`}
    >
      <div>
        <ChevronLeft
          onClick={closeCastModal}
          size={36}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
