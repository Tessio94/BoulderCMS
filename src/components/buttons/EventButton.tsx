"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "@/lib/serverFunctions/getUserAction";
import { Event } from "@/payload-types";
import { toast } from "sonner";
import Toast from "../sonner/Toast";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
};

type EventButtonProps = {
  type: string;
  event: Event;
  user: User | null;
  joinedUser: Record<string, boolean> | undefined;
  isSubmitted?: boolean;
};

class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

const registerForEvent = async ({
  eventId,
  memberId,
  categoryId,
}: {
  eventId: number;
  memberId: number;
  categoryId: number;
}) => {
  const res = await fetch(`/api/joinEvent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event: eventId,
      member: memberId,
      category: categoryId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new HttpError(data.message || "Registration failed", res.status);
  }

  return data;
};

const getJoinedUser = async (eventId: number, memberId: number) => {
  console.log(eventId, memberId);
  const res = await fetch(
    `/api/joinEvent?eventId=${eventId}&memberId=${memberId}`,
  );
  if (!res.ok) throw new Error("Failed to fetch joinedUser");
  return res.json();
};

const EventButton = ({
  type,
  event,
  user,
  joinedUser,
  isSubmitted = false,
}: EventButtonProps) => {
  // const [isJoined, setIsJoined] = useState(() => {
  //   return joinedUser ? true : false;
  // });
  const [showJoinOverlay, setShowJoinOverlay] = useState(false);

  const router = useRouter();

  const { id: eventId, slug, timeframe, category, registration } = event;

  const categories = category?.docs ?? [];
  console.log("categories", categories);

  const queryClient = useQueryClient();

  let userName: string | undefined;
  let memberId: number | undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    initialData: user,
  });

  if (data && !isLoading) {
    ({ userName, id: memberId } = data);
  }

  const { data: isJoinedUser, isLoading: isJoinedLoading } = useQuery({
    queryKey: ["joinedUser", eventId, memberId],
    queryFn: () => {
      if (!memberId) return Promise.resolve(null);
      console.log(eventId, memberId);
      return getJoinedUser(eventId, memberId);
    },
    enabled: !!memberId,
    initialData: joinedUser,
  });

  let isJoined: boolean;
  if (isJoinedUser && !isJoinedLoading) {
    isJoined = isJoinedUser.alreadyRegistered;
  }

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

    if (userName && type === "join" && memberId) {
      setShowJoinOverlay(true);
      return;
    }

    if (userName && type === "submit" && memberId && isJoined === false) {
      toast.custom((id) => (
        <Toast
          id={id}
          type="not"
          title={"You must join the event."}
          description={"Join in to submit your results!"}
          button={{
            label: "Join event",
            onClick: () => setShowJoinOverlay(true),
          }}
        />
      ));
      return;
    }

    if (userName && type === "submit" && memberId && isJoined === true) {
      router.push(`/events/${slug}/submit-results`);
      return;
    }
  };

  const handleJoinCategory = (categoryId: number) => {
    console.log("categoryId", categoryId);
    if (memberId && eventId && categoryId) {
      mutation.mutate({ eventId, memberId, categoryId });
    }
  };

  const mutation = useMutation({
    mutationFn: registerForEvent,
    onSuccess: () => {
      setShowJoinOverlay(false);
      queryClient.invalidateQueries({
        queryKey: ["joinedUser", eventId, memberId ?? "guest"],
      });
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
      if (error instanceof HttpError && error.status === 409) {
        toast.custom((id) => (
          <Toast
            id={id}
            type="info"
            title={"You are already registered for this event!"}
            button={{
              label: "Homepage",
              onClick: () => router.push("/"),
            }}
          />
        ));
      } else {
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
      }
      setShowJoinOverlay(false);
    },
  });

  const buttonText = () => {
    if (type === "join") return isJoined ? "You're in!" : "Join event";
    if (type === "submit")
      return isSubmitted ? "Results submitted" : "Submit results";
    if (type === "results") return "Show results";
    return "";
  };

  const disabledButton = () => {
    const today = new Date();
    if (type === "join" && isJoined) {
      return true;
    }
    if (type === "submit" && isSubmitted) {
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
    <>
      <button
        // onClick={type === "join" ? handleJoinEvent : handleSubmitEvent}
        // disabled={disabledButton()}
        onClick={handleJoinEvent}
        className="w-full cursor-pointer rounded-2xl bg-cyan-100/80 py-2 text-cyan-900 uppercase transition-all duration-500 hover:bg-cyan-900/40 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-cyan-900/50"
      >
        {buttonText()}
      </button>
      {showJoinOverlay && (
        <div
          onClick={() => setShowJoinOverlay(false)}
          className="fixed inset-0 z-9999 bg-gray-700/10 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-[] shadow-cards-dark absolute top-[50%] left-[50%] flex h-[600px] max-h-[90%] w-[400px] max-w-[90%] translate-x-[-50%] translate-y-[-50%] flex-col items-center justify-between rounded-xl bg-slate-100 px-5 py-10 shadow-lg"
          >
            <div className="w-full">
              <p className="font-nunito mb-10 rounded-xl px-2 py-2 text-center text-2xl font-bold text-cyan-900 underline">
                Choose your category
              </p>
              <div className="relative flex flex-col items-center justify-start">
                {/* <div
                  onClick={() => setShowCategories((prev) => !prev)}
                  className="w-full cursor-pointer rounded-xl border-b-2 border-b-gray-600 bg-cyan-100 px-10 py-4 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50"
                >
                  {categories[0].name}
                </div> */}
                <div className="absolute top-[100%] left-0 w-full overflow-hidden rounded-xl">
                  <div className="max-h-[300px] overflow-y-scroll rounded-xl bg-slate-300 shadow-2xl transition-all duration-300">
                    {categories?.map((group, i) => {
                      return (
                        <div
                          key={i}
                          onClick={() => handleJoinCategory(group.id)}
                          className="cursor-pointer rounded-xl px-10 py-4 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/70 hover:text-amber-400"
                        >
                          {group.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowJoinOverlay(false)}
              className="cursor-pointer rounded-xl border-2 border-cyan-900 bg-slate-300/70 px-10 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/70 hover:text-amber-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventButton;
