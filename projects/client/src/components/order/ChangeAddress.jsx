import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import AddressChangeCard from "./AddressChangeCard"

const ChangeAddress = () => {
  const { onOpen, isOpen, onClose } = useDisclosure()

  const toast = useToast()
  const [address, setAddress] = useState([])
  const [allAddress, setAllAddress] = useState([])
  const [defaultAlert, setDefaultAlert] = useState(null)
  console.log(defaultAlert)
  const fetchAddress = async () => {
    try {
      const response = await axiosInstance.get(
        "/checkoutAddress/defaultAddress"
      )
      setAddress(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  const fetchAllAddress = async () => {
    try {
      const response = await axiosInstance.get("/checkoutAddress/allAddress")
      setAllAddress(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error.response)
    }
  }

  const setAsDefault = async (id) => {
    try {
      const response = await axiosInstance.patch(`/address/setDefault/${id}`)

      toast({
        message: "Address set as default",
        description: response.data.message,
        status: "success",
      })
      fetchAllAddress()
      fetchAddress()
    } catch (error) {
      console.log(error.response)
      toast({
        message: "Fail to set default",
        description: error.response.data.message,
        status: "error",
      })
    }
  }
  useEffect(() => {
    fetchAddress()
  }, [])

  useEffect(() => {
    fetchAllAddress()
  }, [isOpen])
  return (
    <>
      <>
        <Box borderBottom="1px solid var(--N100,#DBDEE2)">
          <Text fontSize={"14px"} fontWeight="bold" pb="14px">
            Shipping Address
          </Text>
        </Box>
        <Box pb="15px" pt="10px">
          <Box>
            <Box display={"flex"} mb="4px">
              <Text fontWeight={"bold"} mr="2px">
                {address.recipients_name}
              </Text>
              <Text mr="1">{address.address_labels} </Text>
              <Box
                fontWeight={"bold"}
                fontSize="10px"
                backgroundColor="#E5F9F6"
                p="0 8px"
                my="auto"
                borderRadius={"3px"}
                color="#0095DA"
              >
                Main
              </Box>
            </Box>
            <Box mb="4px">
              <Text>{address.phone_number}</Text>
            </Box>
            <Box>
              <Text>{address.full_address}</Text>
              <Text>
                {address.districts}, {address.city}, {address.province}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box borderTop="1px solid var(--N100,#DBDEE2)" pt="15px" pb="5">
          <Button
            p="0 16px"
            mb="10px"
            border="1px solid var(--N100,#DBDEE2)"
            bgColor={"white"}
            onClick={onOpen}
          >
            <Text fontWeight={"bold"}>Choose Another Address</Text>
          </Button>
        </Box>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          size={"3xl"}
        >
          <ModalOverlay />
          <ModalContent mt={"90px"} borderRadius="8px" overflow={false}>
            <ModalHeader
              fontSize={"24px"}
              fontWeight="bold"
              textAlign={"center"}
              borderBottom="1px solid #dfe1e3"
              p="0"
              h="36px"
            >
              <Text m="24px 0 16px">Address List</Text>
            </ModalHeader>
            <ModalCloseButton _hover={false} mt="10px" />

            <ModalBody
              overflowY={"scroll"}
              maxH="529px"
              p="24px 40px"
              fontSize={"14px"}
            >
              {allAddress.map((val) => {
                return (
                  <AddressChangeCard
                    address_labels={val.address_labels}
                    recipients_name={val.recipients_name}
                    full_address={val.full_address}
                    phone_number={val.phone_number}
                    id={val.id}
                    on_edit
                    on_default={() => setAsDefault(val.id)}
                    is_default={val.is_default}
                  />
                )
              })}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </>
  )
}

export default ChangeAddress
