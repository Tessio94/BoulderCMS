"use client";

import { getUser } from "@/lib/serverFunctions/getUserAction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import React, { useEffect, useState } from "react";
import Toast from "../sonner/Toast";
import { useRouter } from "next/navigation";

type EventButtonDetails = {
  type: string;
  eventId: number;
  slug: string | undefined | null;
  timeframe: {
    start: string;
    end: string;
  };
  registration: {
    start: string;
    end: string;
  };
};

const registerForEvent = async ({
  eventId,
  memberId,
}: {
  eventId: number;
  memberId: number;
}) => {
  const res = await fetch(`/api/joinEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: eventId,
      member: memberId,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.errors?.[0].message || "Registration falied");
  }

  return res.json();
};

const EventButton = ({
  type,
  eventId,
  slug,
  timeframe,
  registration,
}: EventButtonDetails) => {
  const [isJoined, setIsJoined] = useState(false);

  const router = useRouter();

  let userName: string | undefined;
  let memberId: number | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  if (data && !isLoading) {
    ({ userName, id: memberId } = data);
  }
  // console.log(userName);

  useEffect(() => {
    if (!memberId) return;

    const checkRegistration = async () => {
      try {
        const res = await fetch(
          `/api/joinEvent?eventId=${eventId}&memberId=${memberId}`,
        );
        const data = await res.json();
        if (data.alreadyRegistered) setIsJoined(true);
      } catch (err) {
        console.error("Failed to check registration", err);
      }
    };

    checkRegistration();
  }, [eventId, memberId]);

  const handleJoinEvent = () => {
    if (!userName && type !== "results") {
      toast.custom((id) => (
        <Toast
          id={id}
          type="not"
          title={"You are not logged in."}
          description={
            type === "join"
              ? "Log in to access and enjoy this event!"
              : "Log in to submit your results"
          }
          button={{
            label: "Log in",
            onClick: () =>
              router.push(
                `/login?callbackUrl=${encodeURIComponent(`/events/${slug}#event-content`)}`,
              ),
          }}
        />
      ));
      return;
    }

    if (type === "results") {
      router.push(`/events/${slug}/results`);
    }

    if (userName && type === "join" && memberId && isJoined === true) {
      router.push(`/events/${slug}/details`);
      return;
    }

    if (userName && type === "submit" && memberId && isJoined === true) {
      router.push(`/events/${slug}/submit-results`);
      return;
    }

    if (userName && type === "join" && memberId) {
      mutation.mutate({ eventId, memberId });
    }
  };

  const mutation = useMutation({
    mutationFn: registerForEvent,
    onSuccess: () => {
      setIsJoined(true);
      toast.custom((id) => (
        <Toast
          id={id}
          type="yes"
          title={"You have successfully joined event!"}
          button={{
            label: "Homepage",
            onClick: () => router.push("/"),
          }}
        />
      ));
    },
    onError: (error: any) => {
      toast.custom((id) => (
        <Toast
          id={id}
          title={"Something went wrong please try again!"}
          button={{
            label: "Homepage",
            onClick: () => {},
          }}
        />
      ));
    },
  });

  // const handleClick = () => {
  //   if (type === "join") handleJoinEvent();
  //   else if (type === "submit") handleSubmitEvent();
  //   else if (type === "results") handleShowResults();
  // };

  const buttonText = () => {
    if (type === "join") return isJoined ? "You're in!" : "Join event";
    if (type === "submit") return "Submit results";
    if (type === "results") return "Show results";
    return "";
  };

  const disabledButton = () => {
    const today = new Date();
    if (type === "join" && isJoined) {
      return true;
    }
    if (today > new Date(registration.end) && type === "join") {
      return true;
    }
    if (today > new Date(timeframe.end) && type === "submit") {
      return true;
    }
    return false;
  };

  return (
    <button
      // onClick={type === "join" ? handleJoinEvent : handleSubmitEvent}
      // disabled={disabledButton()}
      onClick={handleJoinEvent}
      className="w-full cursor-pointer rounded-2xl bg-cyan-100/80 py-2 text-cyan-900 uppercase transition-all duration-500 hover:bg-cyan-900/40 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-cyan-900/50"
    >
      {buttonText()}
    </button>
  );
};

export default EventButton;
