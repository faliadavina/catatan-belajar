import React from "react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import Catatan from "./components/Catatan";

export default function Catatan_Belajar() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}>
            <Catatan />
        </Grid>
    </Flex>
  );
}