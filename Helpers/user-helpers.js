import axiosInstance from "./axios";

export async function toggleFollow(userProfile) {
  const { data: newUser } = await axiosInstance.post(
    `users/${userProfile.user.username}/follow/`
  );

  console.log(newUser.profile.followers);
  return newUser;
}
