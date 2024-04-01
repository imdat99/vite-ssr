import React, { ReactElement } from "react";

export class ErrorBoundary extends React.Component<
  { children: ReactElement },
  { hasError: boolean }
> {
  constructor(props: Readonly<{ children: ReactElement }>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Some thing went wrong</h1>;
    }
    return this.props.children;
  }
}
