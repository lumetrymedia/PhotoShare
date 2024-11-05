import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { LinkProps } from 'react-router-dom';

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    as: 'a';
    href: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    as: 'button';
}

export interface RouterLinkProps extends LinkProps {
    as: 'link';
    disabled?: boolean;
}

export type BaseButtonTypes = AnchorProps | ButtonProps | RouterLinkProps;
