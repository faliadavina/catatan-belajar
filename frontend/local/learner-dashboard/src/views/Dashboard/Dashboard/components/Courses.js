// Chakra imports
import {
  Flex,
  Text,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
// Custom components
import { SearchIcon } from "@chakra-ui/icons";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React from "react";

// Courses Component
const Courses = ({ title, amount, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card
      p="16px"
      position="relative"
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      {/* Position the SearchBar absolutely within the card to the top right */}
      <Flex position="absolute" top="4" right="4">
        <SearchBar />
      </Flex>
      <CardHeader p="12px 0px 28px 10px">
        <Flex direction="column">
          <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
            {title}
          </Text>
        </Flex>
      </CardHeader>
      {/* Rest of your Courses component */}
    </Card>
  );
};

export default Courses;

// SearchBar Component
export function SearchBar(props) {
  // Chakra Color Mode
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const inputBg = useColorModeValue("white", "gray.800");

  return (
    <InputGroup
      bg={inputBg}
      borderRadius="15px"
      w="200px"
      _focus={{
        borderColor: mainTeal,
      }}
      _active={{
        borderColor: mainTeal,
      }}
    >
      <InputLeftElement
        pointerEvents="none" // This makes the icon non-interactive
        children={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
      />
      <Input
        fontSize="xs"
        py="11px"
        placeholder="Search from courses..."
        borderRadius="inherit"
        {...props} // Spread the rest of the props here for customizability
      />
    </InputGroup>
  );
}
