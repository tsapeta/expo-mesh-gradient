import type { StyleProp, ViewStyle } from "react-native";

export type MeshGradientViewProps = {
  style?: StyleProp<ViewStyle>;

  /**
   * Width of the mesh, i.e. the number of vertices per row.
   * @default 0
   */
  columns?: number;

  /**
   * Height of the mesh, i.e. the number of vertices per column.
   * @default 0
   */
  rows?: number;

  /**
   * An array of two-dimensional points on the mesh. Must contain `columns * rows` elements.
   */
  points?: number[][];

  /**
   * An array of colors. Must contain `columns * rows` elements.
   * @default []
   */
  colors?: string[];

  /**
   * Whether cubic (smooth) interpolation should be used for the colors in the mesh
   * rather than only for the shape of the mesh.
   * @default true
   */
  smoothsColors?: boolean;

  /**
   * Whether to ignore safe areas when positioning the view.
   * @default true
   */
  ignoresSafeArea?: boolean;
};
