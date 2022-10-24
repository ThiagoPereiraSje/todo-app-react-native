import React from 'react';
import TitleBar from '../TitleBar';
import {Input, VStack, Select, Button, Icon} from 'native-base';
import MtIcon from 'react-native-vector-icons/MaterialIcons';
import InputMask, {formatTime} from '../InputMask';

export default function TaskForm() {
  return (
    <>
      <TitleBar leftTitle="Nova Tarefa" />

      <VStack padding="10px" space={8}>
        <Input variant="underlined" type="text" placeholder="Título" />
        <Input variant="underlined" type="text" placeholder="Subtítulo" />
        <InputMask
          variant="underlined"
          type="text"
          keyboardType="numeric"
          placeholder="Duração"
          onMaskText={formatTime}
          onChangeText={() => ({})}
        />

        <Select
          borderLeftWidth={0}
          borderTopWidth={0}
          borderRightWidth={0}
          borderBottomWidth={2}>
          <Select.Item label="A Fazer" value="TODO" />
          <Select.Item label="Concluída" value="DONE" />
        </Select>

        <Button
          marginTop="3"
          bgColor="cyan.700"
          _pressed={{bgColor: 'cyan.800'}}
          _text={{fontWeight: 'bold'}}
          leftIcon={<Icon as={MtIcon} name="save" />}>
          SALVAR
        </Button>
      </VStack>
    </>
  );
}
