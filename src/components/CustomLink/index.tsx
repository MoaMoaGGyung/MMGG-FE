import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

type CustomLinkType = {
    to: string;
    color?: string;
    children: ReactNode | string;
};

const Container = styled(Link)<{ color: string }>`
    text-decoration: none;
    &:hover {
        color: #305ad9;
        text-decoration: underline;
    }
    color: ${({ color }) => color};
    font-family: "Inter";
    font-size: 15px;
    font-weight: 100;
`;

export const CustomLink = ({
    to,
    children,
    color = "#b2b2b2",
}: CustomLinkType) => {
    return (
        <Container to={to} color={color}>
            {children}
        </Container>
    );
};
