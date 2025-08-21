"use server";

import config from "@payload-config";
import { getPayload } from "payload";
import { headers as getHeaders } from "next/headers";
import type { Member } from "@/payload-types";

export async function getUser() {
  const payload = await getPayload({ config });
  const headers = await getHeaders();
  const { user } = await payload.auth({ headers });

  if (!user) return null;

  if (user.collection === "members") {
    const typedUser = user as Member & { collection: "members" };
    return {
      id: typedUser.id,
      firstName: typedUser.firstName,
      lastName: typedUser.lastName,
      userName: typedUser.userName,
    };
  }

  // fallback if user is from "users" or something else
  return null;
}
