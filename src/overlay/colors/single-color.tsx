import React, { useState } from "react";
import { get } from "lodash/fp";
import { observer } from "mobx-react";
import { Box, Text } from "theme-ui";
import { SketchPicker } from "react-color";

import { useTerrainFeaturesContext } from "../../state/terrain-features";

export const SingleColor = observer(
  ({ layerIndex }: { layerIndex: number }) => {
    const [opened, setOpened] = useState(false);
    const store = useTerrainFeaturesContext();
    const color = get(`layers[${layerIndex}].color`, store);

    if (color == null) return null;

    return (
      <Box
        sx={{
          bg: "background",
          width: "fit-content",
          borderRadius: 0,
          padding: 1,
          margin: 1,
        }}>
        <>
          <Text>{color}</Text>
          <Box
            onClick={() => setOpened((current) => !current)}
            sx={{
              width: (theme) => theme.space[5],
              height: (theme) => theme.space[3],
              borderRadius: 0,
              bg: color,
              boxShadow: 0,
              cursor: "pointer",
            }}
          />

          {opened && (
            <SketchPicker
              color={color}
              // @ts-ignore
              onChange={({ hex }) => store.setLayer(layerIndex)({ color: hex })}
            />
          )}
        </>
      </Box>
    );
  }
);
