import React from 'react';
import {Box, Text, Image} from 'native-base';
import MenuItem from '../MenuItem';
import {useRouteAction} from '../../contexts/route';

type NavViewProps = {
  content?: JSX.Element;
};

function DefaultContent() {
  const {goBack} = useRouteAction();

  return (
    <Box>
      <MenuItem label="Voltar" onPress={goBack} />
    </Box>
  );
}

export default function NavView({content}: NavViewProps) {
  return (
    <Box bgColor="pri.800" flex={1}>
      <Box alignItems="center" p="20px">
        <Image
          source={require('./user.png')}
          alt="Thiago Pereira"
          size="xl"
          borderRadius="full"
        />

        <Text fontWeight="bold" fontSize={20}>
          Thiago Pereira
        </Text>
      </Box>
      {content || <DefaultContent />}
    </Box>
  );
}
