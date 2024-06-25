import { isClient } from "@/lib/utils";
import DevtoolsDetector from "devtools-detector";
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
  componentDidMount(): void {
    if (isClient && import.meta.env.PROD) {
        DevtoolsDetector.addListener((isOpen: boolean) => {
            if (isOpen) {
                document.location.href = 'https://shopee.vn/'
                return;
            }
        })
        DevtoolsDetector.launch()
    }
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
