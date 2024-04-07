// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TimelineRow from "components/Tables/TimelineRow";
import React from "react";

const Timeline = ({ title }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card maxH="100%">
      <CardHeader p="12px 0px 28px 10px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </CardHeader>
    </Card>
  );
};

export default Timeline;
