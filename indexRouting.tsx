import * as React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { ErrorBoundary } from "./error";
import { Step1, IStep1Props } from "./step1";
import { Step2, IStep2Props } from "./step2";
import { Step3, IStep3Props } from "./step3";

import { IFormDataModel } from "models/formDataModel";
import { IAccommodationViewModel } from "models/accommodationViewModel";
import { IRentalCarViewModel } from "models/rentalCarViewModel";

export interface IIndexParams {
  siteId: string;
}

interface IIndexState {
  formData: IFormDataModel;
}

/**
 * Site index page
 */
export class Index extends React.Component<RouteComponentProps<IIndexParams>, IIndexState> {


  /**
   * React render
   */
  public render() {
    return (
      <Switch>
        <Route
          path="/:siteId/zelf-samenstellen/stap3"
          render={this.renderStap3}
          exact={true}
        />
        <Route
          path="/:siteId/zelf-samenstellen/stap2"
          render={this.renderStap2}
          exact={true}
        />
        <Route
          path="/:siteId/zelf-samenstellen"
          render={this.renderStap1}
          exact={false}
        />
      </Switch>
    );
  }
}