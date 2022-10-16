import React from 'react';
import {Button, Modal, Text} from 'native-base';

type ConfirmDialogProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  open,
  message,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={open} onClose={onClose} size="xl">
      <Modal.Content bgColor="sec.550">
        <Modal.CloseButton />
        <Modal.Header borderWidth={0} />
        <Modal.Body>
          <Text textAlign="center" fontSize={16} fontWeight="bold">
            {message}
          </Text>
        </Modal.Body>
        <Modal.Footer bgColor="sec.600">
          <Button
            bgColor="sec.500"
            marginRight={2}
            _text={{fontWeight: 'bold'}}
            _pressed={{bgColor: 'rgba(0,0,0,0.4)'}}
            onPress={onClose}>
            Cancelar
          </Button>
          <Button
            bgColor="cyan.700"
            _text={{fontWeight: 'bold'}}
            _pressed={{bgColor: 'rgba(0,0,0,0.4)'}}
            onPress={onConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
