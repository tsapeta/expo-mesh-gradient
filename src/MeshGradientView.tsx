import { requireNativeView } from "expo";

import { MeshGradientViewProps } from "./MeshGradient.types";

const NativeView = requireNativeView<MeshGradientViewProps>("ExpoMeshGradient");

export default NativeView;
