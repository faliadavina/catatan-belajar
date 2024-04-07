// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { dashboardTableData, timelineData } from "variables/general";

import Timeline from "./components/Timeline";
import Courses from "./components/Courses";

export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        templateRows={{ sm: "1fr auto", md: "1fr", lg: "1fr" }}
        gap="24px"
      >
        <Courses title={"Courses"} />
        <Timeline title={"Timeline Belajar"} />
      </Grid>
    </Flex>
  );
}
