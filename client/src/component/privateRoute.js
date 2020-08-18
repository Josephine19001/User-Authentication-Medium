import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserRoute = ({
  component,
  path,
  ...rest
}) => {
  const { currentUser, } = useSelector(
    (state) => state.authentication
  );

  return currentUser !== null ? (
    <Route exact path={path} component={component} {...rest} />
  ) : (
      <Redirect to={"/"} />
    );
};