"use client";
import React, { useState, useEffect } from "react";
import style from "@/styles/SPA/game/game.module.scss";
import GHeader from "@/components/SPA/game/Gmheader";
import TheGame from "@/components/SPA/game/TheGame";
import { Button } from "@nextui-org/react";

const Game: React.FC = () => {
  const [map, setMap] = useState<string>("game");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState<Record<string, number>>({
    player: 0,
    enemy: 0,
  });
  const [ball, setBall] = useState({
    x: 430,
    y: 250,
    speedX: 2,
    speedY: 2,
  });
  const [playerPaddleY, setPlayerPaddleY] = useState<number>(210);
  const [online, setOnline] = useState<boolean>(false);

  const joinMatchmaking = () => {};
  return (
    <div className={style.gamePage}>
      <GHeader />
      <div className={style.mapSelector}>
        <div className={style.map} onClick={() => setMap("game")}>
          <p>2077</p>
          <img src="https://img.asmedia.epimg.net/resizer/ZoSGJHZZZxMPC694PogLeAI0u8E=/644x362/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/G2RDQ2OAUBAHBOFENCS5F23WFA.png" />
        </div>
        <div className={style.map} onClick={() => setMap("retro")}>
          <p>Retro</p>
          <img src="https://i0.wp.com/mynintendonews.com/wp-content/uploads/2011/08/nes-controller.jpg" />
        </div>
        <div className={style.map} onClick={() => setMap("gym")}>
          <p>CampNou</p>
          <img src="https://www.trollfootball.me/upload/full/2018/12/25/messi-heatmap-vs-roma.jpg" />
        </div>
      </div>
      <div className="flex flex-col gap-9 justify-center items-center">
        <TheGame map={map} onlinemode={online} />
        <div>
          <Button
            className="bg-live text-white font-semibold text-base max-w-[239px] transition duration-500 ease-in-out hover:scale-105 hover:bg-opacity-80"
            data-hover
            data-focus
            onClick={() => joinMatchmaking()}
          >
            JOIN MATCHMAKING
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
