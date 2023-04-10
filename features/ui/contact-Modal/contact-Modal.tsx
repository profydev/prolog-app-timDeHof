import React from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import { color, textFont } from "@styles/theme";
import {
  ButtonSize,
  ButtonColor,
  CustomButton,
} from "@features/ui/button/customButton";
type modalProps = {
  setShowModal: (setShowModal: boolean) => void;
  showModal: boolean;
};
const AppStyles = styled.div<{ showModal: boolean }>`
  z-index: auto;
  position: fixed;
  background: rgba(52, 64, 84, 0.6);
  backdrop-filter: blur(8px);
  left: 0;
  top: 0;
  ${(props) => {
    return css`
      display: ${props.showModal ? "flex" : "none"};
    `;
  }}
  width: 100vw;
  height: 100lvh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0 auto;
`;
const Modal = styled.div`
  position: relative;
  background: #fff;
  max-width: 400px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 32px;
  box-shadow: 0px 20px 24px -4px rgba(16, 24, 40, 0.1),
    0px 8px 8px -4px rgba(16, 24, 40, 0.04);
  border-radius: 12px;
`;
const ModalContext = styled.div`
  max-width: 355px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h1 {
    color: ${color("gray", 900)};
    ${textFont("md", "medium")}
    text-align: center;
  }
  & p {
    color: ${color("gray", 500)};
    margin: 0;
    ${textFont("sm", "regular")}
    text-align: center;
  }
  & img {
    margin: 0;
    padding: 0;
  }
`;
const ModalActions = styled.div`
  max-width: 355px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;
export const ContactModal = ({ showModal, setShowModal }: modalProps) => {
  const cancelHandler = () => {
    setShowModal(false);
  };
  return (
    <AppStyles showModal={showModal}>
      <Modal>
        <ModalContext>
          <Image
            src="/icons/mail.png"
            alt="mail avatar"
            width={48}
            height={48}
          />
          <h1>Contact Us Via Email</h1>
          <p>
            Any questions? Send us an email at prolog@profy.dev. We usually
            answer within 24 hours.
          </p>
        </ModalContext>
        <ModalActions>
          <CustomButton
            size={ButtonSize.lg}
            color={ButtonColor.gray}
            text="Cancel"
            onClick={cancelHandler}
          />
          <CustomButton
            size={ButtonSize.lg}
            color={ButtonColor.primary}
            text="Open Email app"
            href="mailto:support@prolog-app.com?subject=Enquery:"
          />
        </ModalActions>
      </Modal>
    </AppStyles>
  );
};
