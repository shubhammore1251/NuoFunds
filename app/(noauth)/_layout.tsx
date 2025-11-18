import { Slot } from "expo-router";

export default function NoAuthLayout() {
  // const router = useRouter();
  // const { isLoggedIn } = useAuthStore();
  // console.log(isLoggedIn);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.replace("/(auth)/(tabs)/home");
  //   }
  // }, [isLoggedIn, router]);
  return <Slot />;
}