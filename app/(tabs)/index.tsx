import { Screen } from "@/layout/screen";
import { Section } from "@/layout/section";
import { Text, View, ActivityIndicator } from "react-native";
import { GetTime } from "@/components/today/get-time";
import '../../globals.css'
import { useFonts } from "expo-font";
import { WorkingProvider } from "@/context/working-context";
import { MainButton } from "@/components/layout/main-button";
import { DisplayDetails } from "@/components/layout/show-details";
import { cn } from "@/lib/cn";

const TodayScreen = () => {
  const [fontsLoadet] = useFonts({
    'RobotoMono-Regular': require('../../assets/fonts/RobotoMono-Regular.ttf'),
  })

  return (
    <WorkingProvider>
      <Screen scroll>
        <Text className="flex-row text-white">
          Heute: <GetTime bool key={'showDate'} />
        </Text>

        {/* time now */}
        <Section>
          {!fontsLoadet ? (
            <View className="flex-1 items-center justify-center bg-neutral-900">
              <ActivityIndicator />
            </View>
          ): (
            <Text style={{ fontFamily: 'RobotoMono-Regular' }}>
              <GetTime bool={false} key={'showTime'} className={'text-4xl text-center'} />
            </Text>
          )}
        </Section>

        {/* start/stop button */}
        <Section>
          <View className="pb-4"><MainButton end={false} /></View>
          <View><MainButton end={true} /></View>
        </Section>

        {/* workingtime  */}
        <Section title="Arbeitszeit heute">
         <DisplayDetails placed="work" />
        </Section>
        {/* breaks */}
        <Section title="Pausen heute">
          <DisplayDetails placed="break" />
        </Section>
        {/* logs */}
        
        <Section title="Heutige Stempelungen">
          <DisplayDetails placed="logs" />
        </Section>
      </Screen>
    </WorkingProvider>
  );
}

export default TodayScreen