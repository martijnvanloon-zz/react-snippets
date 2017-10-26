import * as React from "react";

import { ClassNames } from "~/helpers/classnames";

export interface IButtonProps {
  /** OnClick callback */
  onClick?: (event: React.MouseEvent<Element>) => void;
  /** Type of the button */
  type?: "primary" | "secondary" | "tertiary";
  /** Child elements */
  children?: React.ReactChild;
  /** Optional class names */
  className?: string;
}

/**
 * Styled button
 */
export class Button extends React.Component<IButtonProps, {}> {
  public static defaultProps: Partial<IButtonProps> = { type: "primary" };

  /**
   * OnClick handler
   */
  public click = (event: React.MouseEvent<Element>) => {
    const { onClick } = this.props;
    if (onClick)
      onClick(event);
  }

  /**
   * React render
   */
  public render() {
    const { className, children, type } = this.props;
    const rootClass = ClassNames({
      "button-config primary": type === "primary",
      "button-config secondary": type === "secondary",
      "button-config primary add": type === "tertiary",
      [`${className}`]: Boolean(className)
    });

    return (
      <button className={rootClass} onClick={this.click}>
        {children}
      </button>
    );
  }
}
