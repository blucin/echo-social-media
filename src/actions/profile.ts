"use server";

// used to create a profile for the first time
export const createProfile = async (data: {
  username: string;
  bio: string | undefined;
}) => {
  await setTimeout(() => {
    console.log(data);
  },1000);
  if(false) {
    return { error: "Profile already exists" };
  }
  return { success: "Profile created" };
}