import { View } from 'react-native';
import { useState } from 'react';

interface useIndicatorParams {
  dotCount: number;
}

const useDotIndicator = ({ dotCount }: useIndicatorParams) => {
  const [dots, setDots] = useState<string[]>(
    Array.from({ length: dotCount }, (_, idx) => (idx === 0 ? 'long' : 'short'))
  );

  const DotIndicator = () => {
    return (
      <View className="flex-row justify-center items-center gap-3 ">
        {dots.map((dot, idx) =>
          dot === 'long' ? (
            <View key={dot + idx} className="w-4 h-2 rounded-full bg-primary shrink-0"></View>
          ) : (
            <View key={dot + idx} className="w-2 h-2 border rounded-full border-primary"></View>
          )
        )}
      </View>
    );
  };

  const move = (activeIndex: number): void => {
    if (activeIndex < 0) activeIndex = 0;
    setDots(
      dots.map((_, index) => {
        if (index === activeIndex) return 'long';
        return 'short';
      })
    );
  };

  return { DotIndicator, dots, move };
};

export default useDotIndicator;
