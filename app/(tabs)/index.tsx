import { Screen } from "@/layout/screen";
import { Section } from "@/layout/section";
import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { GetTime } from "@/components/today/get-time";

import '../../globals.css'
import { cn } from "@/lib/cn";
import { useFonts } from "expo-font";
import { StartButton } from "@/components/stamps/start-button";
import { WorkingProvider } from "@/context/working-context";
import { Logs } from "@/components/stamps/logs";
import { EndButton } from "@/components/stamps/end-button";
import WorkingTimes from "@/components/stamps/working-time";


const TodayScreen = () => {
  const [fontsLoadet] = useFonts({
    'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-Regular.ttf'),
  })

  return (
    <WorkingProvider>
      <Screen scroll>
        <Text className="flex-row text-white">
          Heute: <GetTime date key={'showDate'} />
        </Text>

        {/* Aktuelle Uhrzeit */}
        <Section title="Uhrzeit">
          {!fontsLoadet ? (
            <View className="flex-1 items-center justify-center bg-neutral-900">
              <ActivityIndicator />
            </View>
          ): (
            <Text style={{ fontFamily: 'RobotoMono-Regular' }}>
              <GetTime date={false} key={'showTime'} className={'text-4xl text-center'} />
            </Text>
          )}
        </Section>

        {/* Arbeitszeit heute */}
        <Section title="Arbeitszeit heute">
         <WorkingTimes />
        </Section>

        {/* Toggle Button */}
        <Section>
          <StartButton />
        </Section>

        {/* Tag abschließen */}
        <Section>
         <EndButton />
        </Section>

        {/* Heutige Stempelungen */}
        <Section title="Heutige Stempelungen">
          <Logs />
        </Section>
      </Screen>
    </WorkingProvider>
  );
}

export default TodayScreen