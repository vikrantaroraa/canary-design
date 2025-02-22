import { Option, Poll } from "../components/PollWidget";

export const fetchPoll = async (pollId: number): Promise<Poll> => {
  const response = await fetch(`http://localhost:3000/polls/${pollId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch poll");
  }
  return response.json();
};

export const submitVote = async (
  pollId: number,
  submitOptions: number[]
): Promise<Option> => {};

export const removeVote = async (
  pollId: number,
  submitOptions: number[]
): Promise<Option> => {};
