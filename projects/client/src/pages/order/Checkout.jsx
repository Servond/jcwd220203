import { Box, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axiosInstance } from "../../api"
import ChangeAddress from "../../components/order/ChangeAddress"

const Checkout = () => {
  return (
    <Box w="100%">
      <Box border="1px solid black">
        <Box w="589px" mx={"auto"}>
          <Text>Checkout</Text>
          <Box borderBottom="6px solid var(--N100,#DBDEE2)">
            <ChangeAddress />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Checkout
