import DMbox from "@/components/SPA/chat/DMbox";
import style from "@/styles/SPA/chat/chat.module.scss";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import AvatarBubble from "./AvatarBubble";
import { useParams } from "next/navigation";
import axios from "axios";

const dmList = [
  {
    name: "John3464 Doe",
    online: true,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "02:00 PM",
    avatar: "/assets/components/Profile.svg",
  },
  {
    name: "Joh234n Doe",
    online: false,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "11:00 AM",
    avatar: "/assets/components/Profile.svg",
  },
  {
    name: "John Doe",
    online: true,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "12:00 PM",
    avatar: "/assets/components/Profile.svg",
  },
  {
    name: "John123 Doe",
    online: false,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "11:00 AM",
    avatar: "/assets/components/Profile.svg",
  },
  {
    name: "John 5364Doe",
    online: true,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "12:00 PM",
    avatar: "/assets/components/Profile.svg",
  },
  {
    name: "John D34oe",
    online: false,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "11:00 AM",
    avatar: "/assets/components/Profile.svg",
  },
  {
    name: "Joh3434n Doe",
    online: true,
    lastMsg: "Hey, how are you?",
    lastMsgTime: "12:00 PM",
    avatar: "/assets/components/Profile.svg",
  },
];

const friendsList = [
  {
    nicknae: "John32523646 Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "John D23523oe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "John 343434523Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "John 34Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "Joh1n Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "Joh3n Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "John4 Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "Jo6hn Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
  {
    nicknae: "Jo9hn Doe",
    online: true,
    avatar: "/assets/components/Profile.svg",
  },
];

const FindFriendModal = () => {
  return (
    <>
      <h1>Select Friend</h1>
      <input type="text" id="username" placeholder="username of your friend" />
      <div className={style["friendsList"]}>
        {friendsList.map((friend) => (
          <div className={style["friend"]} key={friend.avatar}>
            <AvatarBubble
              avatar={friend.avatar}
              online={friend.online}
              key={friend.nicknae}
            />
            <h3>{friend.nicknae}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

interface DmSectionProps {
  getType: (type: boolean) => void;
  sendDmOrChannel: (dm: any) => void;
  CompType: boolean;
}
const DmSection = ({ getType, sendDmOrChannel, CompType }: DmSectionProps) => {
  const [findFriendModal, setFindFriendModal] = useState<boolean>(false);
  const [active, setActive] = useState<string>("");
  const [dmsList, setDmsList] = useState<any>([]);
  const params = useParams();
  const handleConversationId = (dm: any) => {
    getType(false);
    sendDmOrChannel(dm);
    setActive(dm);
  };
  useEffect(() => {
    const nickName = params.id;
    const selectedUser = dmsList.find((dm: any) => dm.id === nickName);
    if (selectedUser) {
      sendDmOrChannel(selectedUser);
      getType(false);
      setActive(selectedUser.name);
    }
  }, [dmsList, params.id, sendDmOrChannel, getType]);

  // useEffect(() => {
  //   try {
  //     axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/conversations/myContacts`,
  //         {
  //           withCredentials: true,
  //         }
  //       )
  //       .then((res) => {
  //         setDmsList(res.data);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);
  return (
    <>
      <Modal
        isOpen={findFriendModal}
        className={style["findFriendModal"]}
        overlayClassName={style["modal-overlay"]}
        onRequestClose={() => setFindFriendModal(false)}
      >
        <FindFriendModal />
      </Modal>
      <div className={style["direct-msgs"]}>
        <div className={style["section-header"]}>
          <h2>DIRECT MESSAGES</h2>
          <button
            className={style["add-btn"]}
            onClick={() => setFindFriendModal(true)}
          >
            +
          </button>
        </div>
        {dmList.map((dm, index) => (
          <div key={index} className={style["dm-list"]}>
            <DMbox
              className={
                active === dm.name && !CompType
                  ? "bg-gray-500 rounded-md"
                  : "bg-bghover rounded-md"
              }
              dm={dm}
              key={dm.name}
              SendConversationId={() => handleConversationId(dm.name)}
              badge={0}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DmSection;
