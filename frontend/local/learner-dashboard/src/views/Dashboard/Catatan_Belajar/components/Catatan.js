import React, { useState } from "react";
import { Flex, Spacer, Text, Button, useColorModeValue, Input, InputGroup, InputRightElement, Grid, GridItem, Container } from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { FiPlusSquare } from "react-icons/fi";
import { SearchIcon, LockIcon, EditIcon, DownloadIcon } from "@chakra-ui/icons";
import { Image, HStack, Stack, Badge } from '@chakra-ui/react'

const Catatan = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

  const data = [
    {
      id_catatan: 1,
      judul_catatan: 'Pengembangan Web',
      isi_catatan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac lacinia sapien, sed dictum metus. Suspendisse aliquet, tortor at euismod pharetra, eros dolor iaculis justo, et pulvinar orci massa et turpis. '
    },
    {
      id_catatan: 2,
      judul_catatan: 'Pengolahan Citra Digital',
      isi_catatan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac lacinia sapien, sed dictum metus. Suspendisse aliquet, tortor at euismod pharetra, eros dolor iaculis justo, et pulvinar orci massa et turpis. '
    },
    {
      id_catatan: 3,
      judul_catatan: 'Sistem Terdistribusi',
      isi_catatan: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac lacinia sapien, sed dictum metus. Suspendisse aliquet, tortor at euismod pharetra, eros dolor iaculis justo, et pulvinar orci massa et turpis. '
    },
  ];

  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Flex direction="column" padding="20px">
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb="5" color={textColor}>Catatan Belajar</Text>
        {/* <Button colorScheme="teal" size="sm" leftIcon={<FiPlusSquare />} rounded="md" width="100px" fontWeight="normal"> Tambah </Button> */}
        <Flex minWidth='max-content' alignItems='center' gap='315'>
            <Button colorScheme="teal" size="sm" leftIcon={<FiPlusSquare />} rounded="md" fontWeight="normal" onClick={() => setIsModalOpen(true)}>
                Tambah
            </Button>
            <Spacer />
            <SearchBar />
        </Flex>
        <Container maxW="5xl" bg="gray.100" mt={5} rounded={5}>
            <Grid gap={4} templateColumns='repeat(3, minmax(200px, 1fr))'>
                {data.map((catatan) => (
                <GridItem key={catatan.id_catatan} colSpan={1}>
                    <Card position="relative" overflowX={{ sm: "scroll", xl: "hidden" }} my={4}>
                    <CardHeader p="7px 0px 7px 0px" position="relative">
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                                {catatan.judul_catatan}
                            </Text>
                            <LockIcon color="gray.500" w={4} h={4} position="absolute" top={2} right={2} />
                        </Flex>
                    </CardHeader>
                    <Flex direction="column" pb=".5rem">
                        <Text fontSize="sm" color={textColor}>
                        {catatan.isi_catatan}
                        </Text>
                    </Flex>
                    <HStack spacing='4px' mt={5} pb=".5rem">
                        <Image
                            src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png"
                            borderRadius="full"
                            boxSize="30px"
                            marginRight="5px"
                        />
                        <Text fontSize="sm" fontWeight="medium">
                            Anya Melfissa
                        </Text>
                    </HStack>
                    <Flex alignItems="center" mt={2}>
                        <Stack direction='row' spacing={2}>
                            <Badge style={{ backgroundColor: '#F9A682', color: '#B23E19' }}>Web</Badge>
                            <Badge style={{ backgroundColor: '#F9A682', color: '#B23E19' }}>React</Badge>
                        </Stack>
                        <Spacer />
                        <EditIcon color="teal.500" w={5} h={5} mr={1} boxShadow="0px 0px 0px 1px rgba(0, 0, 0, 0.1)" borderRadius="sm" padding="4px" />
                        <DownloadIcon color="teal.500" w={5} h={5} boxShadow="0px 0px 0px 1px rgba(0, 0, 0, 0.1)" borderRadius="sm" padding="4px"  />
                    </Flex>
                    </Card>
                </GridItem>
                ))}
            </Grid>
        </Container>

    </Flex>
  );
};

export default Catatan;

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
      w="300px"
      _focus={{
        borderColor: mainTeal,
      }}
      _active={{
        borderColor: mainTeal,
      }}
    >
      <InputRightElement
        pointerEvents="none" // This makes the icon non-interactive
        children={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
      />
      <Input
        fontSize="sm"
        py="11px"
        placeholder="Search for catatan belajar..."
        borderRadius="inherit"
        {...props} // Spread the rest of the props here for customizability
      />
    </InputGroup>
  );
}