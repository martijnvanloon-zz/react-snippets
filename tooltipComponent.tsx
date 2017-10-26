import * as React from "react";

import { ClassNames } from "~/helpers/classnames";

export interface ITooltipProps {
  /** OnClick callback */
  onClick?: () => void;
  /** Type of the tooltip */
  type?: "primary" | "secondary";
  /** Child elements */
  children?: React.ReactChild;
  /** Optional class names */
  className?: string;
  /** tooltip content */
  tooltipContent?: string;
  startOpen: boolean;
  startOnce?: boolean;
  siteId?: string;
}

interface ITooltipState {
  tooltipOpen?: boolean;
  startOnce?: boolean;
}

/**
 * Styled tooltip
 */
export class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
  public static defaultProps: Partial<ITooltipProps> = { type: "primary" };
  public state: ITooltipState = {
    tooltipOpen: this.props.startOpen,
    startOnce: this.props.startOnce
  };
  private container: JQuery;

  private toggleTooltip = () => {
    const { tooltipOpen } = this.state;
    const { startOpen, startOnce } = this.props;
    if (startOpen == false) {

      if (tooltipOpen && startOnce) {
        this.setState({
          tooltipOpen: !tooltipOpen
        });
      }
      else if (startOnce == undefined && startOpen == false) {
        this.setState({
          tooltipOpen: !tooltipOpen
        });
      }
    }
  }

  public componentDidMount() {
    const { tooltipOpen, startOnce } = this.state;
    $(window).on("click", this.click);

    if (startOnce == true) {
      this.setState({
        tooltipOpen: true,
        startOnce: false
      });
    }
  }

  public componentWillReceiveProps(nextProps: ITooltipProps) {
    const { startOpen } = nextProps;
    const { tooltipOpen } = this.state;
    if (startOpen == true) {
      this.setState({
        tooltipOpen: true
      });
    }
  }

  public componentWillUnmount() {
    $(window).off("click", this.click);
  }

  public click = (event: JQueryEventObject) => {
    if (!this.container || !this.state.tooltipOpen)
      return;

    const isChild = this.container.has(event.target).length > 0;
    if (isChild)
      return;

    event.stopPropagation();
    this.toggleTooltip();
  }

  /**
   * React render
   */
  public render() {
    const { className, children, type, tooltipContent, siteId } = this.props;
    const { tooltipOpen } = this.state;
    const rootClass = ClassNames({
      "tooltip-config": type === "primary",
      "tooltip-config error-tooltip": type === "secondary",
      "tooltip-open": tooltipOpen,
      "no-tooltip": siteId == "schotland",
      [`${className}`]: Boolean(className)
    });

    return (
      <div
        className={rootClass}
        onClick={this.toggleTooltip}
        ref={(ref) => this.container = jQuery(ref)}
      >
        <div className="tooltip-content">{tooltipContent}</div>
        {children}
      </div>
    );
  }
}
