import React from "react";
import { ProgressBar } from "../Profile/molecules/ProgressBar";
import { Progress } from "@nextui-org/react";
import Image from "next/image";

interface ResultProps {
  name: string;
  scoreleft: number;
  scoreright: number;
  result: "You Won" | "You Lost";
  img: string;
  value: number;
}

export const Result = ({
  name,
  scoreleft,
  scoreright,
  result,
  img,
  value,
}: ResultProps) => {
  const color = result === "You Won" ? "text-emerald-500" : "text-red-700";
  return (
    <div className="flex flex-col items-center justify-center bg-modalBackground  gap-4  p-10 rounded-[4rem] w-[312px]">
      <h1 className={`text-3xl font-ClashGrotesk-Medium ${color} mb-5`}>
        {result}
      </h1>

      <Image
        width={100}
        height={100}
        src={img}
        alt={"userprofile"}
        className="rounded-full"
      />
      <h1 className="text-2xl font-ClashGrotesk-Regular text-white">{name}</h1>

      <div className="flex flex-row items-center justify-evenly w-[112px]">
        <div>
          <h1 className="text-2xl font-bold text-white">{scoreleft}</h1>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">:</h1>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{scoreright}</h1>
        </div>
      </div>

      <Progress
        aria-label="Downloading..."
        size="md"
        value={value}
        color="primary"
        showValueLabel={true}
        className="w-3/4"
      />
    </div>
  );
};
export default Result;
