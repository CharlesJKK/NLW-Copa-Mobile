import { HStack } from 'native-base';
import CountryFlag from "react-native-country-flag";

import { Input } from '../../components/Input/Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  firstTeamPT?: string;
  secondTeamPT?: string;
}

export function Team({ code, position, onChangeText, firstTeamPT, secondTeamPT }: Props) {


  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={10}
        h={9}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        placeholder={position == 'left' ? secondTeamPT : firstTeamPT}
      />

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}