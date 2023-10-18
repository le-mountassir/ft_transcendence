"use client";

import { InFosPlayer } from "@/components/SPA/Profile/atoms/InFosPlayer";

import LeftProfile from "@/components/SPA/Profile/molecules/LeftProfile";

import ProfileComp from "@/components/SPA/Profile/molecules/ProfileComp";
import { ProgressBar } from "@/components/SPA/Profile/molecules/ProgressBar";
import Stats from "@/components/SPA/Profile/molecules/Stats";
import MiddleComponent from "@/components/SPA/Profile/organisms/MiddleComponent";

import React, { useState } from "react";

import { FaUser } from "react-icons/fa";
import { useQuery } from "react-query";

import { getUserProfile } from "@/api/getUserProfile";
import Leadrboard from "../organisms/Leadrboard";
interface ProfileProps {
  index: string;
}

export default function Profile({ index }: ProfileProps) {
  const names = ["Friends", "Match History", "Channels"];
  const [active, setActive] = useState(0);

  function handleActive(index: number) {
    setActive(index);
  }
  const { isLoading, error, data } = useQuery("userList", async () => {
    return getUserProfile();
  });
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="Parent max-w-[1536px] m-auto">
      <h1 className="font-custom text-white text-2xl font-ClashGrotesk-Regular">
        <span style={{ display: "flex", alignItems: "center" }}>
          <FaUser style={{ marginRight: "0.5rem" }} /> Welcome, {data.FullName}
        </span>
      </h1>
      <div className="item-1  relative ">
        <LeftProfile
          image={data.userImage}
          name={data.FullName}
          nickName={data.nickName}
        />
        <div className="min-w-[80px] h-0"></div>
        <ProgressBar lvl={data.Lvl} exp={data.userExp} maxExp={12798} />
        <Stats
          perc={data.WinPerc}
          money={data.userMoney}
          matches={data.userMatches}
        />
      </div>

      <div className="item-2">
        <div className="C-1" style={{ overflow: "auto" }}>
          <div className="flex items-center justify-center">
            <h1 className="opacity-90 font-ClashGrotesk-Medium text-lg text-white  p-2">
              Leaderboard
            </h1>
          </div>
          <Leadrboard />
        </div>

        <div className="C-2 " style={{ overflow: "auto" }}>
          <div className="flex item-center justify-evenly">
            {names.map((name, index) => (
              <InFosPlayer
                key={index}
                whenClick={() => handleActive(index)}
                text={name}
                active={active === index}
              />
            ))}
          </div>

          <MiddleComponent index={active} />
        </div>
        <div className="C-3">
          <div className="flex items-center justify-center">
            <h1 className="opacity-90 font-ClashGrotesk-Medium text-lg text-white  p-2">
              Archivements
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}