import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const MeetingList = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["meetings"]);

  return (
    <div>
      参加しているメンバールーム
      {cookies.meetings &&
        cookies.meetings.map((meeting) => {
          return (
            <div key={meeting.id}>
              <div>{meeting.name}</div>
              <Link to={`/${meeting.id}`}>
                {`${window.location.origin}/${meeting.id}`}
              </Link>
            </div>
          );
        })}
    </div>
  );
};
