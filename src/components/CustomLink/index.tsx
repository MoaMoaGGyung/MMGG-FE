import styled from "@emotion/styled";
import { LinkBaseProps } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CustomLinkType extends LinkBaseProps {
    to: string;
    size?: string | number;
    fontWeight?: number;
    color?: string;
    children: ReactNode | string;
}

const Container = styled(Link)<{
    color: string;
    fontWeight: number;
    size: string | number;
}>`
    text-decoration: none;
    &:hover {
        color: #305ad9;
        text-decoration: underline;
    }
    color: ${({ color }) => color};
    font-family: "Inter";
    font-size: ${({ size }) => size};
    font-weight: ${({ fontWeight }) => fontWeight};
`;

export const CustomLink = ({
    children,
    to,
    color = "#b2b2b2",
    fontWeight = 300,
    size = "20px",
}: CustomLinkType) => {
    return (
        <Container to={to} color={color} fontWeight={fontWeight} size={size}>
            {children}
        </Container>
    );
};
