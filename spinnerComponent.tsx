import * as React from "react";

import { ClassNames } from "~/helpers/classnames";

interface ISpinnerProps {
  /** Type of the Spinner */
  type?: "primary";
  /** Optional class names */
  className?: string;
  /** Max value */
  max?: number;
  /** Min value */
  min?: number;
  /** Current value */
  cur?: number;
  /** OnChange callback */
  onChange?: (current: number) => void;
}

interface ISpinnerState {
  count: number;
}

/**
 * Styled Spinner with number
 */
export class Spinner extends React.Component<ISpinnerProps, ISpinnerState> {
  public static defaultProps: Partial<ISpinnerProps> = {
    type: "primary",
    max: 10,
    min: 0,
    cur: 0
  };

  public state: ISpinnerState = {
    count: this.getFixedCur()
  };

  private getFixedCur(): number {
    const { cur, min, max } = this.props;

    if (cur > max)
      return max;
    if (cur < min)
      return min;
    return cur;
  }

  /**
   * OnChange callback with defined check
   */
  private onChange(current: number) {
    const { onChange } = this.props;

    return () => {
      if (onChange)
        onChange(current);
    };
  }

  private onUp = () => {
    const { count } = this.state;
    const { max } = this.props;
    const newCount = count + 1;

    if (newCount > max) return;

    this.setState({
      count: newCount
    }, this.onChange(newCount));
  }

  private onDown = () => {
    const { count } = this.state;
    const { min } = this.props;
    const newCount = count - 1;

    if (newCount < min) return;

    this.setState({
      count: newCount
    }, this.onChange(newCount));
  }

  /**
   * React render
   */
  public render() {
    const { className, children, type, min, max } = this.props;
    const { count } = this.state;
    const rootClass = ClassNames({
      spinner: type === "primary",
      [`${className}`]: Boolean(className)
    });
    const upClass = ClassNames({
      "counter": true,
      "inactive": count >= max
    });
    const downClass = ClassNames({
      "counter": true,
      "inactive": count <= min
    });

    return (
      <div className={rootClass}>
        <input
          type="text"
          className="quantity user-no-select"
          value={count}
          min={min}
          max={max}
          readOnly={true}
        />
        <div className="quantity-input">
          <div className={upClass} onClick={this.onUp}>
            <i className="fa fa-chevron-up" />
          </div>
          <div className={downClass} onClick={this.onDown}>
            <i className="fa fa-chevron-down" />
          </div>
        </div>
      </div>
    );
  }
}
