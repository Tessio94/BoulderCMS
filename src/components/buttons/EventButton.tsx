"use client";

import { getUser } from "@/lib/serverFunctions/getUserAction";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import React, { useState } from "react";
import Toast from "../sonner/Toast";
import { useRouter } from "next/navigation";

const registerForEvent = async ({
  eventId,
  memberId,
}: {
  eventId: number;
  memberId: number;
}) => {
  const res = await fetch(`/api/event-registrations`, {
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
}: {
  type: string;
  eventId: number;
  slug: string | undefined | null;
}) => {
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
  console.log(userName);

  const handleJoinEvent = () => {
    if (!userName) {
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
            onClick: () => router.push("/login"),
          }}
        />
      ));
      return;
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
            onClick: () => router.push("/"),
          }}
        />
      ));
    },
  });

  return (
    <button
      // onClick={type === "join" ? handleJoinEvent : handleSubmitEvent}
      onClick={handleJoinEvent}
      className="w-full cursor-pointer rounded-2xl bg-cyan-100/80 py-2 text-cyan-900 uppercase transition-all duration-500 hover:bg-cyan-900/40"
    >
      {type === "join"
        ? isJoined
          ? "See event"
          : "Join event"
        : "Submit results"}
    </button>
  );
};

export default EventButton;
