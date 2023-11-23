"use client";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import style from "@/styles/SPA/chat/chat.module.scss";
import { IoIosArrowDown } from "react-icons/io";
import UserMenu from "@/components/SPA/chat/UserMenu";
import ChannelMenu from "@/components/SPA/chat/channels/ChannelMenu";
import Modal from "react-modal";
import { useRouter } from "next/navigation";
import axios from "axios";

interface chatHeaderProps {
  isChannel: boolean;
  dmOrChannel: any;
}

const ChatHeader = (chatHeaderProps: chatHeaderProps) => {
  const [showModal, setShow] = useState(false);
  const router = useRouter();
  const leaveGroup = (id: number) => {
    console.log("hola " + id);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/channels/${id}/leave`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          router.push("/chat/channels/1337");
        }
      });
  };
  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={() => {
          setShow(false);
        }}
        className={
          chatHeaderProps?.isChannel
            ? style["channel-menu-modal"]
            : style["user-menu-modal"]
        }
        overlayClassName={style["modal-overlay"]}
      >
        {chatHeaderProps?.isChannel ? (
          <ChannelMenu channel={chatHeaderProps?.dmOrChannel} />
        ) : (
          <UserMenu user={chatHeaderProps?.dmOrChannel} />
        )}
      </Modal>
      <div className={style["chat-header"]}>
        <div className={style["chat-user-group"]}>
          <div className={style["name"]}>
            {chatHeaderProps?.isChannel
              ? chatHeaderProps?.dmOrChannel?.name
              : chatHeaderProps?.dmOrChannel}
          </div>
          <button
            onClick={() => {
              setShow(true);
            }}
          >
            <IoIosArrowDown
              width={12}
              height={8}
              className={style["arrow-down"]}
            />
          </button>
        </div>
        {chatHeaderProps?.isChannel && (
          <FiLogOut
            className={style["leave-group"]}
            onClick={() => {
              leaveGroup(chatHeaderProps?.dmOrChannel?.id);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ChatHeader;
