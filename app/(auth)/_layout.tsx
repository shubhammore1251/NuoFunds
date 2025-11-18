import { Slot } from "expo-router";

export default function AuthRoot() {
  //  const router = useRouter();
  //   const { isLoggedIn } = useAuthStore();
  
  //   useEffect(() => {
  //     if (!isLoggedIn) {
  //       router.replace("/(auth)/(tabs)/home");
  //     }
  //   }, [isLoggedIn, router]);
  return <Slot />; // lets both (tabs) and other screens render here
}