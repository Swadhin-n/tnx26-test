import "react";

// Allow CSS custom properties (e.g. style={{ "--d": "0.2s" }}) in inline styles.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
