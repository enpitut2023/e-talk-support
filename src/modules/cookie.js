//cookieにmeetingIdを追加
//削除できるようにしたい
export const setMeetingCookie = (
  cookies,
  setCookie,
  meetingId,
  meetingName
) => {
  if (cookies.meetings) {
    //cookieがあれば
    const meetingList = cookies.meetings;
    if (!meetingList.find((elem) => elem.id === meetingId)) {
      //cookieに当meetingのデータがなければ
      meetingList.push({ id: meetingId, name: meetingName });
    }
    setCookie("meetings", meetingList, { maxAge: 315360000 });
  } else {
    //cookieがなければ
    setCookie("meetings", [{ id: meetingId, name: meetingName }], {
      maxAge: 315360000,
    });
  }
};
