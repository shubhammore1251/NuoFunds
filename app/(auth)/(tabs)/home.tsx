import { Pressable, Text } from 'react-native';

import { PageView } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();
  return (
    <PageView className='flex justify-center items-center'>
      <Text className='font-bold text-2xl text-center text-red-500'>Home tabs</Text>
      <Pressable onPress={() => router.push("/(noauth)/login")} className="items-center mt-4">
        <Text className="text-sm text-blue-600">
          Go to login
        </Text> 
      </Pressable>
    </PageView>
  );
}
