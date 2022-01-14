import React from "react";
import "react-responsive-modal/styles.css";
import "./ResponsiveModal.scss";
import { Modal } from "react-responsive-modal";
import { ReactComponent as CloseIcon } from "../../static/icons/icon-close.svg";
import styled from "styled-components";
import {
  AddDevice,
  ControlDevice,
  ControlMode,
  ControlMove,
  ControlPower,
  ControlTime,
  SortDevice,
} from ".";
import useStore from "../../stores";
import { useObserver } from "mobx-react";
import { ModalType } from "../../stores/modal";

const ModalHeader = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Box = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;
`;

export const ColBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;

  .option-list {
    display: flex;
    gap: 10px;
  }
`;

const ResponsiveModal = () => {
  const { modal } = useStore();

  return useObserver(() => (
    <Modal
      open={modal.modalVisible}
      onClose={() => modal.handleClose()}
      center
      closeOnEsc
      closeOnOverlayClick
    >
      <ModalHeader>
        <p>{modal.modalTitle}</p>
        <CloseButton onClick={() => modal.handleClose()} />
      </ModalHeader>
      <Content>
        <ModalContent type={modal.type} />
      </Content>
    </Modal>
  ));
};

const ModalContent = ({ type }: { type: ModalType }) => {
  const { modal } = useStore();

  switch (type) {
    case "addDevice":
      return <AddDevice />;
    case "sortDevice":
      return <SortDevice />;
    case "controlDevice":
      return <ControlDevice />;
    case "controlMove":
      return <ControlMove />;
    case "controlPower":
      return <ControlPower device_id={modal.targetDeviceId} />;
    case "controlMode":
      return <ControlMode device_id={modal.targetDeviceId} />;
    case "controlTime":
      return <ControlTime device_id={modal.targetDeviceId} />;
    default:
      return <></>;
  }
};

export default ResponsiveModal;
