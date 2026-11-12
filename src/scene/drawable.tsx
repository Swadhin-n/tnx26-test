import { Children, cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";

const SHAPES = new Set(["path", "circle", "ellipse", "rect", "line", "polyline", "polygon"]);

/**
 * Walks an SVG art tree and gives every solid stroke `pathLength=1` plus the class `ink`,
 * so CSS can "draw" it with stroke-dashoffset driven by a single --draw variable.
 * Dashed strokes keep their pattern and fade in instead.
 */
export function drawable(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const el = child as ReactElement<Record<string, unknown>>;
    const props = el.props;
    const extra: Record<string, unknown> = {};
    if (typeof el.type === "string" && SHAPES.has(el.type)) {
      if (props.strokeDasharray === undefined) {
        extra.pathLength = 1;
        extra.className = "ink";
      } else {
        extra.className = "ink-fade";
      }
    }
    if (props.children !== undefined) extra.children = drawable(props.children as ReactNode);
    return cloneElement(el, extra);
  });
}
