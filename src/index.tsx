import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-multiplier' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Multiplier = NativeModules.Multiplier
  ? NativeModules.Multiplier
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Multiplier.multiply(a, b);
}
