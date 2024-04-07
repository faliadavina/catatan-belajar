import React from "react";
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import Catatan from "./components/Catatan";

export default function Catatan_Belajar() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <Catatan />
        </Grid>
    </Flex>
  );
}