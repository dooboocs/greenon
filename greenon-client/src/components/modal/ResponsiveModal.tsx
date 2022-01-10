import React from "react";
import "react-responsive-modal/styles.css";
import "./ResponsiveModal.scss";
import { Modal } from "react-responsive-modal";
import { ReactComponent as CloseIcon } from "../../static/icons/icon-close.svg";
import styled from "styled-components";
import { ControlDeviceModal } from ".";
import { TextInput } from "../common";
import { Button as BaseButton } from "../common";
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

const Box = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;
`;

const ColBox = styled.div`
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

const Button = styled.button<{ active?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  font-weight: 400;
  background-color: ${({ active }) => (active ? "#007cba" : "inherit")};
  color: ${({ active, theme }) => (active ? "#fff" : "#007cba")};
`;

const ResponsiveModal = () => {
  const { modal } = useStore();

  return useObserver(() => (
    <Modal
      open={modal.modalVisible}
      onClose={modal.handleClose}
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
  const { modal, device } = useStore();

  function handleOpenModal(e: any) {
    e.preventDefault();
    modal.handleOpen(e.target.name);
  }

  function handleUpdateDevice(key: string, value: any) {
    device.updateDevice(modal.targetDeviceId, key, value);
  }

  switch (type) {
    case "addDevice":
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ fontSize: 16, textAlign: "center" }}>
            신규제품을 등록하기 위해서는
            <br />
            WIFI에 제품을 연동한 후<br />
            진행해주셔야 합니다
          </p>
          <TextInput type="text" label="제품번호" />
          <BaseButton name="error" onClick={handleOpenModal}>
            확인
          </BaseButton>
        </div>
      );
    case "error":
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p style={{ fontSize: 16, textAlign: "center" }}>
            Wifi의 접속을 통해 제품이
            <br />
            등록되어야 합니다.
            <br />
            아래의 설명자료를 확인하시고
            <br />
            다시 한번 진행해주시기 바랍니다
          </p>
          <BaseButton>WIFI 연동 메뉴얼</BaseButton>
          <TextInput type="text" label="제품번호" />
          <BaseButton>확인</BaseButton>
        </div>
      );
    case "sortDevice":
      return (
        <>
          <Box>등록순</Box>
          <Box>동작중</Box>
          <Box>수위 낮음</Box>
          <Box>약품 없음</Box>
          <Box>공간 제균 모드</Box>
          <Box>해충 방제 모드</Box>
          <Box>바이오에어로졸 지수</Box>
          <Box>공기질 지수</Box>
          <Box>미세먼지 지수</Box>
        </>
      );
    case "controlDevice":
      return <ControlDeviceModal />;
    case "controlMove":
      return (
        <>
          <ColBox>
            공간 제균
            <div className="option-list">
              <Button active>1시간</Button>
              <Button>2시간</Button>
              <Button>연속</Button>
              <Button>수동</Button>
            </div>
          </ColBox>
          <ColBox>
            해충방제
            <div className="option-list">
              <Button active>1시간</Button>
              <Button>2시간</Button>
              <Button>연속</Button>
              <Button>수동</Button>
            </div>
          </ColBox>
        </>
      );
    case "controlPower":
      return (
        <>
          <Box
            style={{
              cursor: "pointer",
            }}
            onClick={() => handleUpdateDevice("power", true)}
          >
            ON
          </Box>
          <Box
            style={{
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => handleUpdateDevice("power", false)}
          >
            OFF
          </Box>
        </>
      );
    case "controlMode":
      return (
        <>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateDevice("mode", 1)}
          >
            공간 제균
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateDevice("mode", 2)}
          >
            해충 방제
          </Box>
        </>
      );
    case "controlTime":
      return (
        <>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateDevice("mode_time", "1시간")}
          >
            1시간
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateDevice("mode_time", "2시간")}
          >
            2시간
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateDevice("mode_time", "연속")}
          >
            연속
          </Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateDevice("mode_time", "수동")}
          >
            수동
          </Box>
        </>
      );
    default:
      return <></>;
  }
};

export default ResponsiveModal;
