import { Stack } from "expo-router";
import store from '../store'
import { Provider } from 'react-redux'

// export const unstable_settings = {
//   initialRouteName: "account",
// };

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}

