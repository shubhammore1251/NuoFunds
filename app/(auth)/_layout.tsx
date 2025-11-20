import { Slot } from "expo-router";

export default function AuthRoot() {
  return <Slot />; // lets both (tabs) and other screens render here
}