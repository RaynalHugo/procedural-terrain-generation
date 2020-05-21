import React, { useState, useCallback } from "react";
import { set } from "lodash/fp";

import { Box, Slider, Text } from "theme-ui";

import { useStoreContext } from "../state/context";
import { observer } from "mobx-react";

export const SeaLevel = observer(() => {
  console.log("render SL");
  const store = useStoreContext();

  const setSeaLevelFromEvent = useCallback(
    (event) => store.setSeaLevel && store.setSeaLevel(event.target.value / 100),
    []
  );

  return (
    <>
      <Text>Sea Level</Text>
      <Slider
        sx={{ mt: 3, mb: 3 }}
        value={(store.seaLevel || 0) * 100}
        onChange={setSeaLevelFromEvent}
      />
    </>
  );
});
export const Strength = observer(() => {
  const store = useStoreContext();
  console.log("render ST");

  const setStrengthFromEvent = useCallback(
    (event) => store.setStrength && store.setStrength(event.target.value),
    []
  );

  return (
    <>
      <Text>Strength</Text>
      <Slider
        sx={{ mt: 3, mb: 3 }}
        value={store.strength || 0}
        onChange={setStrengthFromEvent}
      />
    </>
  );
});
