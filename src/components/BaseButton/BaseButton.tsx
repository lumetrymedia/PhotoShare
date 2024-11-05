import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AnchorProps, BaseButtonTypes, ButtonProps, RouterLinkProps } from './BaseButton.types';

import './BaseButton.scss';

const BaseButton = (props: BaseButtonTypes) => {
    const { as, children, className, ...rest } = props;

    const baseButtonClasses = classNames(className, 'base-button', {
        'base-button--disabled': (as === 'button' || as === 'link') && props.disabled,
    });

    const renderButton = () => {
        switch (as) {
            case 'a':
                return (
                    <a className={baseButtonClasses} {...(rest as AnchorProps)}>
                        {children}
                    </a>
                );
            case 'button':
                return (
                    <button className={baseButtonClasses} type="button" {...(rest as ButtonProps)}>
                        {children}
                    </button>
                );
            case 'link':
                return (
                    <Link className={baseButtonClasses} {...(rest as RouterLinkProps)}>
                        {children}
                    </Link>
                );
            default:
                return null;
        }
    };

    return renderButton();
};

export default BaseButton;
