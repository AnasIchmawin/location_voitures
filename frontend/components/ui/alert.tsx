"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

interface CardProps {
  message: string;
  type_alert: "success" | "error" | "";
}

const Card: React.FC<CardProps> = ({ message, type_alert }) => {
  return (
    <CenteredWrapper>
      <StyledWrapper>
        <div className={type_alert}>
          <div className={`${type_alert}__icon`}>
            <svg
              fill="none"
              height={24}
              viewBox="0 0 24 24"
              width={24}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
                fill="#393a37"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className={`${type_alert}__title`}>{message}</div>
        </div>
      </StyledWrapper>
    </CenteredWrapper>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  z-index: 1000;
`;

const StyledWrapper = styled.div`
  .success {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    min-width: 40rem;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background: #edfbd8;
    border-radius: 8px;
    box-shadow: 0px 0px 5px -3px #111;
    margin-top: 20px;
    animation: ${slideIn} 0.5s ease-out;
  }

  .error {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    min-width: 40rem;
    padding: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    background: #fde8e8;
    border-radius: 8px;
    box-shadow: 0px 0px 5px -3px #111;
    margin-top: 20px;
    animation: ${slideIn} 0.5s ease-out;
  }

  .error__icon {
    width: 20px;
    height: 20px;
    transform: translateY(-2px);
    margin-right: 8px;
  }

  .error__icon path {
    fill: #d65a5a;
  }

  .error__title {
    font-weight: 500;
    font-size: 14px;
    color: #641e1e;
  }

  .error__close {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;
  }

  .error__close path {
    fill: #641e1e;
  }

  .success__icon {
    width: 20px;
    height: 20px;
    transform: translateY(-2px);
    margin-right: 8px;
  }

  .success__icon path {
    fill: #84d65a;
  }

  .success__title {
    font-weight: 500;
    font-size: 14px;
    color: #2b641e;
  }

  .success__close {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-left: auto;
  }

  .success__close path {
    fill: #2b641e;
  }
`;

export default Card;
